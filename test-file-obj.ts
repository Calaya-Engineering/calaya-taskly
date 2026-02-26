import { File } from "buffer";
const f = new File(["hello"], "test.pdf", { type: "application/pdf" });
console.log("Name:", f.name);
