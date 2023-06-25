import { MdAdd } from "react-icons/md"
import { FaListUl } from "react-icons/fa"

export const clientData = [
    {
        icon: <MdAdd />,
        id: 1,
        title: 'Add Client',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
        path: 'addClient',
        component: 'Chat'
      },
      {
        icon: <FaListUl />,
        id: 2,
        title: "Client's List",
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
        path: 'clientsList',
        component: 'Cart'
      }
]

export const clientListData = [
    {
        sl_no: '1',
        company: 'Windlass',
        contact_person: 'Sohel',
        mob_number: '000000000',
        email: 'tzirw@example.com',
        address: 'Dhaka, Bangladesh',
        location : 'Dhaka'
    }
]