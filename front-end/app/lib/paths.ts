import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";


export const paths = [
    {
        groupName: 'Menu',
        paths: [
            { name: 'Dashboard', href:'/dashboard', icon: outline.Squares2X2Icon, litIcon: solid.Squares2X2Icon },
            { name: 'Transfer', href: '/transfer', icon: outline.ArrowUpCircleIcon, litIcon: solid.ArrowUpCircleIcon },
            { name: 'Payment Request', href: '/payment-request', icon: outline.DocumentCurrencyDollarIcon, litIcon: solid.DocumentCurrencyDollarIcon },
            { name: 'Transaction', href: '/transaction', icon: outline.CurrencyDollarIcon, litIcon: solid.CurrencyDollarIcon},
            { name: 'Contacts', href: '/contacts', icon: outline.UsersIcon, litIcon: solid.UsersIcon},
        ]
    },
    {
        groupName: 'Help & Settings',
        paths: [
            { name: 'Settings', href:'/settings', icon: outline.Cog6ToothIcon, litIcon: solid.Cog6ToothIcon },
            { name: 'Feedback', href: '/feedback', icon: outline.InformationCircleIcon, litIcon: solid.InformationCircleIcon}
        ]
    },
]