import React from 'react'
import QRCode from 'qrcode.react'
import { useStateMainContext } from '../../../contexts/MainContextProvider'
import { useStateContext } from '../../../contexts/ContextProvider'
const QRDownload = () => {

    const {appName} = useStateMainContext()
    const apkDownloadLink = `/public/apk/${appName}`

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="p-8 grid place-items-center rounded-lg text-center">
            <QRCode  value={window.location.origin + apkDownloadLink} size={170} />
            <h1 className="text-2xl font-semibold mt-4">Scan QR Code to Download the App</h1>
        </div>
</div>

  )
}

export default QRDownload