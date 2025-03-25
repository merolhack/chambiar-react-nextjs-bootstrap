// components/withAuth.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAuth(Component: React.ComponentType) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter()

        useEffect(() => {
            const token = localStorage.getItem('access_token')
            if (!token) {
                router.push('/authentication/sign-in/')
            }
        }, [router])

        return <Component {...props} />
    }
}