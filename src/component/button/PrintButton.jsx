import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'


const PrintButton = () => {

    const componentPDF = useRef();

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "dsdsdsdsds",
        onAfterPrint:()=>alert("Data saved in PDF")
    })

  return (
    <div>
        <button type="button" class="text-white bg-sky-400 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800" onClick={generatePDF}>Print</button>
    </div>
  )
}

export default PrintButton