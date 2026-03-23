import React from 'react'
import Navbar from '../COMPONENTS/Layout/Navbar'
import Footer from '../COMPONENTS/Layout/Footer'
import Hero from '../COMPONENTS/Hero'
import Card from '../COMPONENTS/Product/Card'
import CardList from '../COMPONENTS/Product/CardList'
import Top from '../COMPONENTS/top/Top'
import Banner from '../COMPONENTS/Banner/Banner'
function Home() {
  return (
	<div>
	  <Navbar />
	  <Hero />
	 {/* <CardList/> */}
	 <Top/>	
	 <Banner/>
	
	  <Footer />
	</div>
  )
}

export default Home
