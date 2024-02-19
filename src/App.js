import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes, NavLink, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { Helmet } from 'react-helmet';
import logoImg from './logo.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Home() {
  const images = [
    "/img/3.png", 
    "/img/4.png", 
    "/img/5.jpg", 
    "/img/6.png", 
    "/img/7.png", 
    "/img/8.png", 
    "/img/9.jpg", 
    "/img/10.png", 
    "/img/11.png", 
    "/img/12.png"
  ];

  // 이미지 배열을 무작위로 섞기
  const shuffledImages = [...images];
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }

  const [bgImage1, setBgImage1] = useState(shuffledImages[0]);
  const [bgImage2, setBgImage2] = useState(shuffledImages[1]); // 초기 이미지를 다르게 설정

  const imageIndexRef1 = useRef(0);
  const imageIndexRef2 = useRef(1);

  // 이미지를 일정 시간마다 변경
  useEffect(() => {
    const intervalId = setInterval(() => {
      imageIndexRef1.current = (imageIndexRef1.current + 1) % shuffledImages.length;
      imageIndexRef2.current = (imageIndexRef2.current + 1) % shuffledImages.length;
      setBgImage1(shuffledImages[imageIndexRef1.current]);
      setBgImage2(shuffledImages[imageIndexRef2.current]);
    }, 4000); // 4초마다 이미지 변경

    return () => {
      clearInterval(intervalId);
    };
  }, [shuffledImages]);

    return (
    <div className="mainDivHome">
      <Helmet>
        <title>HWARA JO</title>
      </Helmet>
      <nav className="homeNav">
        <div className="navButton home">
          <NavLink to="/">HWARA JO</NavLink>
        </div>
        <div className="navButton home2">
          <NavLink to="/"><div class="logoImg"></div></NavLink>
        </div>
        <div className="navButton inventory">
          <NavLink to="/Inventory">INVENTORY</NavLink>
        </div>
        <div className="navButton about">
          <NavLink to="/About">ABOUT</NavLink>
        </div>
        <div className="navButton more">
          <NavLink to="/More">*</NavLink>
        </div>
      </nav>
      <div className="homeMain1" style={{backgroundImage: `url(${bgImage1})`}}>
      </div>
      <div className="homeMain2" style={{backgroundImage: `url(${bgImage2})`}}></div>
    </div>
  );
}

function Inventory(){
  const [bgColor, setBgColor] = useState(''); // 세로 모드 배경 색상
  const [bgColor2, setBgColor2] = useState(''); // 가로 모드 배경 색상
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    // 배경 색상 랜덤 선택
    const colors = ['#009884', '#005528', '#6EC8EB', '#531916', '#FED36F', '#B4D2C1', '#4C2859', '#3981C0', '#F19E46'];
    const idx = Math.floor(Math.random() * colors.length);
    setBgColor(colors[idx]);

    const colors2 = ['#FF5733', '#22A7F0', '#FC427B', '#F3CA40', '#C4E538', '#17C0EB', '#7158e2', '#009432'];
    const idx2 = Math.floor(Math.random() * colors2.length);
    setBgColor2(colors2[idx2]);
  }, []);

  // 화면 방향 확인
  useEffect(() => {
    function handleResize() {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;
      const aboutButton = document.querySelector('.navButton.about');
      const moreButton = document.querySelector('.navButton.more');
  
      if (isLandscape && aboutButton && moreButton) {
        aboutButton.style.backgroundColor = bgColor2;
        moreButton.style.backgroundColor = bgColor2;
      } else if (!isLandscape && aboutButton && moreButton) {
        aboutButton.style.backgroundColor = bgColor;
        moreButton.style.backgroundColor = bgColor;
      }
    }
  
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로딩 시 설정
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bgColor, bgColor2]);

  //게시글
  const [items] = useState([
    { 
      title: '1 번째 아이템 입니다람쥐~~', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },
    { 
      title: '2 번째 아이템', 
      category: 'PPPP',
      year: '1995',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
      ],
    },{ 
      title: '3 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '4 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '5 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '6 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '7 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '8 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },
    { 
      title: '9 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '10 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },
    { 
      title: '11 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '12 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '13 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '14 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '15 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '16 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '17 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '18 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '19 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '20 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '21 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '22 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '23 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '24 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '25 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '26 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '27 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '28 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '29 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },{ 
      title: '30 번째 아이템', 
      category: 'Poster',
      year: '2024',
      content: '아이템의 내용입니다.',
      imageUrls: [
        'https://placekitten.com/800/400',
        'https://placekitten.com/800/401',
        'https://placekitten.com/800/402',
        'https://placekitten.com/800/400',
      ],
    },
  ]);

  const [sliderImages, setSliderImages] = useState([]); // Slider 이미지들을 상태로 관리

  // 슬라이드 생성 함수
  const createSlides = (imageUrls) => {
    setSliderImages(imageUrls.map((imageUrl, index) => (
      <div className="slide" key={index}>
        <img className="slideImg" src={imageUrl} alt={`Slide ${index + 1}`} />
      </div>
    )));
  };

  // 클릭한 아이템의 이미지들을 슬라이드에 적용
  useEffect(() => {
    if (expandedItem !== null) {
      createSlides(items[expandedItem].imageUrls);
    }
  }, [expandedItem, items]);

  const handleItemClick = (index) => {
    setExpandedItem(index === expandedItem ? null : index);
  };

  //react-slick
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    arrows: false,
  };

    return (
    <div className="bodyDiv">
      <Helmet>
        <title>INVENTORY - HWARA JO</title>
      </Helmet>
      <nav className="nav">
        <div className="navButton home" style={{backgroundColor: bgColor}}>
          <NavLink to="/">HWARA JO</NavLink>
        </div>
        <div className="navButton home2" style={{backgroundColor: bgColor}}>
          <NavLink to="/"><div class="logoImg"></div></NavLink>
        </div>
        <div className="navButton inventory" style={{backgroundColor: bgColor}}>
          <NavLink to="/Inventory">INVENTORY</NavLink>
        </div>
        <div className="navButton about" style={{backgroundColor: bgColor2}}>
          <NavLink to="/About">ABOUT</NavLink>
        </div>
        <div className="navButton more" style={{backgroundColor: bgColor2}}>
          <NavLink to="/More">*</NavLink>
        </div>
      </nav>
      <div className="mainDiv">
        <div className="main1" style={{backgroundColor: bgColor}}></div>
        <div className="main2" style={{backgroundColor: bgColor2}}></div>
      </div>
      <div class="inventoryBody">
        <div>
          <div class="projectsList">
            <div class="items">
              {items.map((item, index) => (
              <div
                className={`item ${expandedItem === index ? 'expanded' : ''}`}
                //style={expandedItem === index ? { height: item.content ? '330px' : '300px' } : { height: '31px' }}
                key={index}
                onClick={() => handleItemClick(index)}
              >
                <div class={`itemTitle ${expandedItem === index ? 'expanded' : ''}`}>
                  <div class={`itemName ${expandedItem === index ? 'expanded' : ''}`}>
                    {item.title}
                  </div>
                  <div class="itemDiv">
                    <div class="itemCategory"
                      style={{color: expandedItem === index ? 'white' : 'black'}}>
                      {item.category}
                    </div>
                    <div style={{display: expandedItem === index ? 'block' : 'none'}}>
                      ,
                    </div>
                    <div class="itemYear"
                      style={{color: expandedItem === index ? 'white' : 'black'}}>
                      {item.year}
                    </div>
                  </div>
                  {expandedItem === index && (
                  <div class="itemContent">
                    {item.content}
                  </div>
                  )}
                </div>
                {expandedItem === index && (
                <div className="itemSub">
                  <Slider {...settings} className="slider">
                    {sliderImages}
                  </Slider>
                </div>
                )}
                {expandedItem === index && (
                <div class="itemContent2">
                  {item.content}
                </div>
                )}
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  const [bgColor, setBgColor] = useState(''); // 세로 모드 배경 색상
  const [bgColor2, setBgColor2] = useState(''); // 가로 모드 배경 색상

  useEffect(() => {
    // 배경 색상 랜덤 선택
    const colors = ['#009884', '#005528', '#6EC8EB', '#531916', '#FED36F', '#B4D2C1', '#4C2859', '#3981C0', '#F19E46'];
    const idx = Math.floor(Math.random() * colors.length);
    setBgColor(colors[idx]);

    const colors2 = ['#FF5733', '#22A7F0', '#FC427B', '#F3CA40', '#C4E538', '#17C0EB', '#7158e2', '#009432'];
    const idx2 = Math.floor(Math.random() * colors2.length);
    setBgColor2(colors2[idx2]);
  }, []);

  // 화면 방향 확인
  useEffect(() => {
    function handleResize() {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;
      if (isLandscape) {
        document.querySelector('.navButton.about').style.backgroundColor = bgColor2;
        document.querySelector('.navButton.more').style.backgroundColor = bgColor2;
      } else {
        document.querySelector('.navButton.about').style.backgroundColor = bgColor;
        document.querySelector('.navButton.more').style.backgroundColor = bgColor;
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로딩 시 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bgColor, bgColor2]);

  return (
    <div className="bodyDiv">
      <Helmet>
        <title>ABOUT - HWARA JO</title>
      </Helmet>
      <nav className="nav">
        <div className="navButton home" style={{backgroundColor: bgColor}}>
          <NavLink to="/">HWARA JO</NavLink>
        </div>
        <div className="navButton home2" style={{backgroundColor: bgColor}}>
          <NavLink to="/"><div class="logoImg"></div></NavLink>
        </div>
        <div className="navButton inventory" style={{backgroundColor: bgColor}}>
          <NavLink to="/Inventory">INVENTORY</NavLink>
        </div>
        <div className="navButton about" style={{backgroundColor: bgColor2}}>
          <NavLink to="/About">ABOUT</NavLink>
        </div>
        <div className="navButton more" style={{backgroundColor: bgColor2}}>
          <NavLink to="/More">*</NavLink>
        </div>
      </nav>
      <div className="mainDiv">
        <div className="main1" style={{backgroundColor: bgColor}}></div>
        <div className="main2" style={{backgroundColor: bgColor2}}></div>
      </div>
      <div className="aboutDiv">
        <div className="aboutDiv1">
          <div className="aboutDiv3">
            <div className="aboutNav">
              <Link to="introduction" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                INTORDUCTION
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="solo" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                SOLO EXHIBITION
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="group" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                GROUP EXHIBITION
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="award" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                AWARD
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="workshop" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                LECTURES AND WORKSHOP
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="featured" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                FEATURED IN
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="clients" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                COLLABORATORS AND CLIENTS
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="contact" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                CONTACT
              </Link>
            </div>
            <div className="aboutNav">
              <Link to="site" spy={true} offset={-31} smooth={true} duration={400} activeStyle={{ color: 'white' }}>
                ABOUT THIS SITE
              </Link>
            </div>
          </div>
        </div>
        <div className="aboutDiv2">
          <div id="introduction">
            INTORDUCTION1 <br></br>
            INTORDUCTION2 <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
            INTORDUCTION <br></br>
          </div>
          <div id="solo">
            SOLO EXHIBITION1 <br></br>
            SOLO EXHIBITION2 <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
            SOLO EXHIBITION <br></br>
          </div>
          <div id="group">
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
            GROUP EXHIBITION <br></br>
          </div>
          <div id="award">
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
            AWARD <br></br>
          </div>
          <div id="workshop">
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
            WORKSHOP <br></br>
          </div>
          <div id="featured">
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
            FEATURED <br></br>
          </div>
          <div id="clients">
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
            CLIENTS <br></br>
          </div>
          <div id="contact">
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
            CONTACT <br></br>
          </div>
          <div id="site">
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
            SITE <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

function More() {
  const [bgColor, setBgColor] = useState(''); // 세로 모드 배경 색상
  const [bgColor2, setBgColor2] = useState(''); // 가로 모드 배경 색상

  useEffect(() => {
    // 배경 색상 랜덤 선택
    const colors = ['#009884', '#005528', '#6EC8EB', '#531916', '#FED36F', '#B4D2C1', '#4C2859', '#3981C0', '#F19E46'];
    const idx = Math.floor(Math.random() * colors.length);
    setBgColor(colors[idx]);

    const colors2 = ['#FF5733', '#22A7F0', '#FC427B', '#F3CA40', '#C4E538', '#17C0EB', '#7158e2', '#009432'];
    const idx2 = Math.floor(Math.random() * colors2.length);
    setBgColor2(colors2[idx2]);
  }, []);

  // 화면 방향 확인
  useEffect(() => {
    function handleResize() {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;
      if (isLandscape) {
        document.querySelector('.navButton.about').style.backgroundColor = bgColor2;
        document.querySelector('.navButton.more').style.backgroundColor = bgColor2;
      } else {
        document.querySelector('.navButton.about').style.backgroundColor = bgColor;
        document.querySelector('.navButton.more').style.backgroundColor = bgColor;
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로딩 시 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bgColor, bgColor2]);

  return (
    <div className="bodyDiv">
      <Helmet>
        <title>* - HWARA JO</title>
      </Helmet>
      <nav className="nav">
        <div className="navButton home" style={{backgroundColor: bgColor}}>
          <NavLink to="/">HWARA JO</NavLink>
        </div>
        <div className="navButton home2" style={{backgroundColor: bgColor}}>
          <NavLink to="/"><div class="logoImg"></div></NavLink>
        </div>
        <div className="navButton inventory" style={{backgroundColor: bgColor}}>
          <NavLink to="/Inventory">INVENTORY</NavLink>
        </div>
        <div className="navButton about" style={{backgroundColor: bgColor2}}>
          <NavLink to="/About">ABOUT</NavLink>
        </div>
        <div className="navButton more" style={{backgroundColor: bgColor2}}>
          <NavLink to="/More">*</NavLink>
        </div>
      </nav>
      <div className="mainDiv">
        <div className="main1" style={{backgroundColor: bgColor}}></div>
        <div className="main2" style={{backgroundColor: bgColor2}}></div>
      </div>
      <div>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444앗!!!<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      44444444444<br></br>
      4444444444444444444<br></br>
      4444444444444<br></br>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/About" element={<About />} />
        <Route path="/More" element={<More />} />
        <Route path="/*" element={'Not Found'} />
      </Routes>
    </div>
  );
}

export default App;
