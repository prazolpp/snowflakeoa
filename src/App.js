import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import previousIcon from './assets/icons/left-icon.png';
import nextIcon from './assets/icons/right_icon.png';
import thumb1 from './assets/images/thumb/tea-light-thumb.jpeg';
import thumb2 from './assets/images/thumb/white-light-thumb.jpeg';
import thumb3 from './assets/images/thumb/pink-light-thumb.jpeg';
import thumb4 from './assets/images/thumb/tea-light-thumb.jpeg';
import image1 from './assets/images/tea-light.jpeg';
import image2 from './assets/images/white-light.jpeg';
import image3 from './assets/images/pink-light.jpeg';
import image4 from './assets/images/tea-light.jpeg';

import './App.css';
import Viewer from "./components/Viewer";
import Thumbs from "./components/Thumbs";

const catalogArr = [
    {
      thumb: thumb1,
      image: image1
    },
    {
      thumb: thumb2,
      image: image2
    },
    {
      thumb: thumb3,
      image: image3
    },
    {
      thumb: thumb4,
      image: image4
    }
];
  
const App = () => {

    const [title, setTitle] = useState('Catalog Viewer')
    const [catalogs, setCatalogs] = useState([...catalogArr])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [catalogSelected, setCatalogSelected] = useState(catalogArr[3])
    const [slideActive, setSlideActive] = useState(false)
    const [slideTimer, setSlideTimer] = useState(null)
    const [slideDuration, setSlideDuration] = useState(3000)


    const selectedCatalog = (index) => {
        resetSlideTimer(slideActive)
        setCatalogSelected(catalogs[index])
        setCurrentIndex(index)
    }
  
    const previousClick = () => {
        let prevIndex = currentIndex == 0 ? catalogs.length - 1 : currentIndex - 1
        setCurrentIndex(prevIndex)
        setCatalogSelected(catalogs[prevIndex])
        resetSlideTimer(slideActive)
    }
  
    const nextClick = () => {
        let nextIndex = currentIndex == catalogs.length - 1 ? 0 : currentIndex + 1
        setCurrentIndex(nextIndex)
        setCatalogSelected(catalogs[nextIndex])
        resetSlideTimer(slideActive)
    }
  
    const slideChange = (event) => {
        if (event.target.checked == true) {
            setSlideActive(true)
        }
        else { 
            setSlideActive(false)
        }
    }

    useEffect(() => {
        if (slideActive) {
            let timer = setTimeout(() => {
                onSlideChange() 
            }, slideDuration)
            setSlideTimer(timer, slideDuration)
        } 
        else {
            clearTimeout(slideTimer)
            setSlideTimer(null)
        }
    }, [currentIndex, slideActive]);
    
  
    const resetSlideTimer = (isActive = false) => {
        if (isActive) {
            clearInterval(slideTimer)
            setSlideTimer(null)
        }
    }
  
    const onSlideChange = () => {
        console.log("changed!!")
        let nextIndex = (currentIndex + 1) % catalogs.length
        setCurrentIndex(nextIndex)
        setCatalogSelected(catalogs[nextIndex])
        console.log(currentIndex);
    }

    return (
        <div>
          <div className="title" data-testid="app-title"> {title} </div>
          <div className="catalog-outer">
            <div className="catalog-view">
              <div className="text-center">
                <div className="view-outter text-center">
                  <Viewer catalog={catalogSelected.image}/>
                </div>
              </div>
            </div>
            <div className="catalog-items">
              <div className="previous" onClick={previousClick} data-testid="prev-icon">
                <img src={previousIcon} alt="prev"/>
              </div>
              <div className="next" onClick={nextClick} data-testid="next-icon">
                <img src={nextIcon} alt="next"/>
              </div>
              <Thumbs items={catalogs} currentIndex={currentIndex} selectedCatalog={selectedCatalog}/>
            </div>

            <div className="slide-input">
              <input type="checkbox" onChange={slideChange} className="test" data-testid="slide"/> Slide
            </div>
          </div>
        </div>
    );
}

export default App;
