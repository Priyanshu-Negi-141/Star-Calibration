import React from 'react'

const PurchaseReqList = () => {
  return (
    <div className='m-10'>
        <div className='text-center text-red-500 mb-10 text-bold p-2'>
            <h2>Purchase Requisition</h2>
        </div>
        <div className='grid grid-cols-2 gap-5'>
            <div SclassName='flex gap-3'><p>PR. No</p><p className='border border-b-black w-60'></p></div>
            <div className='flex gap-3'><p>Date:</p><p className='border border-b-black w-60'></p></div>
            <div className='flex gap-3'><p>Department:</p><p className='border border-b-black w-48'></p></div>
            <div className='flex col-span-2 gap-3 '><p>Date by which material is required:</p><p className='border border-b-black w-80'></p></div>
        </div>
        <div className='mt-5 border border-black'>
            <div className='grid grid-cols-3 text-center border text-bold border-b-black bg-gray-300 dark:bg-gray-800 dark:text-white'>
                <div className='flex justify-center items-center'>
                    <p className='w-20 border border-r-black'>SL No.</p>
                    <p className='w-full border border-r-black'>Item Name</p>
                </div>
                <div>
                    <p className='border border-r-black'>Description</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20 border border-r-black'>Qty</p>
                    <p className='w-full'>Remark</p>
                </div>
            </div>
            <div className='grid grid-cols-3 text-center border border-b-black dark:text-white'>
                <div className='flex justify-center items-center'>
                    <p className='w-20 border border-r-black'>SL No.</p>
                    <p className='w-full border border-r-black'>Item Name</p>
                </div>
                <div>
                    <p className='border border-r-black'>Description</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20 border border-r-black'>Qty</p>
                    <p className='w-full'>Remark</p>
                </div>
            </div>
            <div className='grid grid-cols-3 text-center border border-b-black dark:text-white'>
                <div className='flex justify-center items-center'>
                    <p className='w-20 border border-r-black'>SL No.</p>
                    <p className='w-full border border-r-black'>Item Name</p>
                </div>
                <div>
                    <p className='border border-r-black'>Description</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20 border border-r-black'>Qty</p>
                    <p className='w-full'>Remark</p>
                </div>
            </div>
            <div className='grid grid-cols-3 text-center border border-b-black dark:text-white'>
                <div className='flex justify-center items-center'>
                    <p className='w-20 border border-r-black'>SL No.</p>
                    <p className='w-full border border-r-black'>Item Name</p>
                </div>
                <div>
                    <p className='border border-r-black'>Description</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20 border border-r-black'>Qty</p>
                    <p className='w-full'>Remark</p>
                </div>
            </div>
            <div className='grid grid-cols-3 text-center border border-b-black dark:text-white'>
                <div className='flex justify-center items-center'>
                    <p className='w-20 border border-r-black'>SL No.</p>
                    <p className='w-full border border-r-black'>Item Name</p>
                </div>
                <div>
                    <p className='border border-r-black'>Description</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20 border border-r-black'>Qty</p>
                    <p className='w-full'>Remark</p>
                </div>
            </div>
            
        </div>

        {/*  */}

        <div className='grid grid-cols-2 gap-5 mt-10'>
            <div className='flex col-span-2 gap-3'><p>Requested By.</p><p className='border border-b-black w-60'></p></div>
            <div className='flex gap-3'><p>Checked By:</p><p className='border border-b-black w-60'></p></div>
            <div className='flex gap-3'><p>Approved By:</p><p className='border border-b-black w-48'></p></div>
        </div>

    </div>
  )
}

export default PurchaseReqList