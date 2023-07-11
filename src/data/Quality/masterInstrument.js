import { MdAdd } from "react-icons/md"
import { FaListUl } from "react-icons/fa"

export const masterInstrumentData = [
    {
        icon: <MdAdd />,
        id: 1,
        title: 'Add Master List',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
        path: 'primarySecondary'
      },
      {
        icon: <FaListUl />,
        id: 2,
        title: 'View Master List',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
        path: 'masterInstrumentList',
        component: 'Cart'
      },
      {
        icon: <FaListUl />,
        id: 3,
        title: 'Obsolute Master List',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
        path: 'masterInstrumentList',
        component: 'Cart'
      }
]