import { afterEach, describe, expect, it, vi } from "vitest";
import { validateLogo, MAX_LOGO_BYTES } from "./storeLogo";
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();vi.resetModules();});
describe("store logo uploads",()=>{
 it("rejects unsupported files, empty images, and oversized files",()=>{
  for(const file of [{type:"image/svg+xml",size:100},{type:"text/html",size:100},{type:"image/png",size:0},{type:"image/png",size:MAX_LOGO_BYTES+1}]) expect(()=>validateLogo(file)).toThrow();
  expect(()=>validateLogo({type:"image/jpeg",size:MAX_LOGO_BYTES})).not.toThrow();
 });
 it("normalizes an image and sends authenticated multipart data without overwriting existing logos",async()=>{
  vi.stubEnv("VITE_SUPABASE_URL","https://example.supabase.co");vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY","public-test");
  const close=vi.fn();vi.stubGlobal("createImageBitmap",vi.fn().mockResolvedValue({width:1000,height:500,close}));
  const drawImage=vi.fn();const canvas={width:0,height:0,getContext:()=>({drawImage}),toBlob:(cb:(b:Blob)=>void)=>cb(new Blob(["png"],{type:"image/png"}))};
  vi.stubGlobal("document",{createElement:()=>canvas});const fetch=vi.fn().mockResolvedValue(new Response("{}",{status:200}));vi.stubGlobal("fetch",fetch);
  const {uploadStoreLogo}=await import("./storeLogo");const file=new File(["jpg"],"original.jpg",{type:"image/jpeg"});const url=await uploadStoreLogo(file,"admin-token");
  expect(canvas.width).toBe(512);expect(canvas.height).toBe(256);expect(close).toHaveBeenCalled();
  const [path,opts]=fetch.mock.calls[0];expect(path).toMatch(/\/storage\/v1\/object\/store-logos\/.*\.png$/);expect(opts.headers.Authorization).toBe("Bearer admin-token");expect(opts.headers["x-upsert"]).toBe("false");expect(opts.headers["Content-Type"]).toBeUndefined();expect(opts.body).toBeInstanceOf(FormData);expect(url).toContain("/object/public/store-logos/");
 });
 it("does not upload invalid input or unauthenticated requests",async()=>{
  vi.stubEnv("VITE_SUPABASE_URL","https://example.supabase.co");vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY","public-test");const fetch=vi.fn();vi.stubGlobal("fetch",fetch);const {uploadStoreLogo}=await import("./storeLogo");
  await expect(uploadStoreLogo(new File(["x"],"a.svg",{type:"image/svg+xml"}),"token")).rejects.toThrow();await expect(uploadStoreLogo(new File(["x"],"a.png",{type:"image/png"}),"")).rejects.toThrow();expect(fetch).not.toHaveBeenCalled();
 });
});
