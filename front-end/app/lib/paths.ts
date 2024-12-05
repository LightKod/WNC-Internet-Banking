import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";


export const paths = [
    {
        groupName: 'Menu',
        paths: [
            { name: 'Dashboard', href:'/dashboard', icon: outline.Squares2X2Icon, litIcon: solid.Squares2X2Icon },
            { name: 'Transfer', href: '/transfer', icon: outline.ArrowUpCircleIcon, litIcon: solid.ArrowUpCircleIcon }
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