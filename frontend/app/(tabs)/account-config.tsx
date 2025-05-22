import React from 'react'
import DeactivateAccount from '@/components/admin/deactivate-account'
import ActivateAccount from '@/components/admin/activate-account'


const AccountConfig = () => {
    return (
        <>
            <ActivateAccount />
            <DeactivateAccount />
        </>
    )
}

export default AccountConfig
