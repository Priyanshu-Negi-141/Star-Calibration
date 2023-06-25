import {HiOutlineDocumentDuplicate} from 'react-icons/hi'
import {MdOutlineListAlt} from 'react-icons/md'
import {RiFileAddLine} from 'react-icons/ri'

export const hvacValData = [
    {
        icon: <RiFileAddLine />,
        id: 1,
        title: 'Generate SRF',
        iconColor: '#03C9D7',
        iconBg: '#ECCDB4',
        pcColor: 'red-600',
        component: 'Chat'
    },
    {
        icon: <HiOutlineDocumentDuplicate />,
        id: 1,
        title: 'Duplicate SRF',
        iconColor: '#150050',
        iconBg: '#FF6000',
        pcColor: 'red-600',
        component: 'Chat'
    },
    {
        icon: <MdOutlineListAlt />,
        id: 1,
        title: 'SRF List',
        iconColor: '#03C9D7',
        iconBg: '#8B1874',
        pcColor: 'red-600',
        component: 'Chat'
    }
]