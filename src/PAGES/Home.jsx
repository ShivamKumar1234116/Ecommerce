import React from 'react'

import Hero from '../COMPONENTS/Hero'
import Card from '../COMPONENTS/Product/Card'
import CardList from '../COMPONENTS/Product/CardList'
import Top from '../COMPONENTS/top/Top'
import Banner from '../COMPONENTS/Banner/Banner'
import CuratedLooks from '../COMPONENTS/CuratedLooks'
function Home() {
  return (
	<div>
	  <Hero />
	 {/* <CardList/> */}
	 <Banner/>

	 {/* <Top/>	 */}
	 <CuratedLooks/>
	
	</div>
  )
}

export default Home
