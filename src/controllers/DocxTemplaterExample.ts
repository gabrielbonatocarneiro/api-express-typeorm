import { Request, Response } from "express"

import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"

import fs from "fs"
import path, { dirname } from "path"

export class DocxTemplaterExample {
  constructor() {}

  async example1(request: Request, response: Response) {
    const basePath = dirname(require.main.filename)

    const content = fs.readFileSync(path.resolve(basePath, 'templates-docx', "example1.docx"), "binary")

    const zip = new PizZip(content)

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    })

    doc.render({
      first_name: "John",
      last_name: "Doe",
      phone: "0652455478",
      description: "New Website",
    })

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const pathOutputDocx = path.resolve(basePath, 'tmp', "output1.docx")

    fs.writeFileSync(pathOutputDocx, buf);

    return response.status(200).json({
      message: "docx generated"
    })
  }

   async example2(request: Request, response: Response) {
    const basePath = dirname(require.main.filename)

    const content = fs.readFileSync(path.resolve(basePath, 'templates-docx', "example2.docx"), "binary")

    const zip = new PizZip(content)

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    })

    doc.render({
      products: [{
 	 	    title: "Duk",
 	 	    name: "DukSoftware",
 	 	    reference: "DS0"
		  }, {
 	 	    title: "Tingerloo",
 	 	    name: "Tingerlee",
 	 	    reference: "T00"
	    }]
    })

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const pathOutputDocx = path.resolve(basePath, 'tmp', "output2.docx")

    fs.writeFileSync(pathOutputDocx, buf);

    return response.status(200).json({
      message: "docx generated"
    })
  }
}
