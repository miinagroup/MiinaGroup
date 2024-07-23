const pdfValidate = (pdfs) => {
    let pdfsTable = []
    if(Array.isArray(pdfs)) {
        pdfsTable = pdfs
    } else {
        pdfsTable.push(pdfs)
    } 

    if(pdfsTable.length > 3) {
        return { error: "Send only 3 pdf at once" }
    }
    for(let pdf of pdfsTable) { 
        if(pdf.size > 3145728) return { error: "Size too large (above 3 MB)" }

        const filetypes = /pdf/
        const mimetype = filetypes.test(pdf.mimetype)
        if(!mimetype) return { error: "Incorrect mime type (should be pdf)" }
    }

    return { error: false }
}

module.exports = pdfValidate