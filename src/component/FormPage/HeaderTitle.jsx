import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

const HeaderTitle = () => {

    const { currentColor } = useStateContext()

  return (
    <div className='m-2'>
        <div className='grid grid-cols-10 border' style={{borderColor: currentColor}}>
            <div className='col-span-10 border flex gap-2 p-1' style={{borderColor:currentColor}} ><h1>Title:</h1><p></p></div>
            <div className='col-span-1 text-center'><h1 className='border p-1 h-full' style={{borderColor: currentColor}}>Format No.</h1></div>
            <div className='col-span-1 text-center'><h1 className='border p-1 h-full ' style={{borderColor: currentColor}}>Issue No</h1></div>
            <div className='col-span-1 text-center'><h1 className='border p-1 h-full' style={{borderColor: currentColor}}>Issue No</h1></div>
            <div className='col-span-2 text-center'><h1 className='border p-1 h-full' style={{borderColor: currentColor}}>Amendment No</h1></div>
            <div className='col-span-2 text-center'><h1 className='border p-1 h-full' style={{borderColor: currentColor}}>Amendment Date</h1></div>
            <div className='col-span-2 text-center'><h1 className='border h-full' style={{borderColor: currentColor}}>Next Review Date <br />(on & Before)</h1></div>
            <div className='col-span-1 text-center'><h1 className='border p-1 h-full' style={{borderColor: currentColor}}>Page No</h1></div>
        </div>
        <div className='grid grid-cols-10 border' style={{borderColor: currentColor}}>
            <div className='col-span-1 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
            <div className='col-span-1 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
            <div className='col-span-1 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
            <div className='col-span-2 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
            <div className='col-span-2 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
            <div className='col-span-2 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
            <div className='col-span-1 text-center'><p className='border p-1' style={{borderColor: currentColor}}>sss</p></div>
        </div>

    </div>
  )
}

export default HeaderTitle