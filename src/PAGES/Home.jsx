import React from 'react'

import Hero from '../COMPONENTS/Hero'
import Card from '../COMPONENTS/Product/Card'
import CardList from '../COMPONENTS/Product/CardList'
//
import Banner from '../COMPONENTS/Banner/Banner'
import CuratedLooks from '../COMPONENTS/CuratedLooks'
import ShopByCategory from '../COMPONENTS/ShopByCategory'
function Home() {
  return (
	<div>
	  <Hero />
	 {/* <CardList/> */}
	 <ShopByCategory/>	
	 <Banner/>

	 {/* <Top/>	 */}
	
	
	</div>
  )
}

export default Home
