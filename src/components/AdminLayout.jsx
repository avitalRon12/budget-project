import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'


const AdminLayout = () => {

    return (
        <>
            <AdminNavbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AdminLayout