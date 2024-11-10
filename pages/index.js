import dynamic from 'next/dynamic';
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
