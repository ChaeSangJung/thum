import React, {useState, useRef, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import resizeOpt from '../style/resize';

const ItemList = styled.div`
    width: calc(100%/4);
`;
const BoxUpper = styled.div`
    position: relative !important;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 56%;
    background-repeat: no-repeat;
    background-size: 200px;
    background-position: 50%;
    background-color: #f4f4f4;
    bottom: 0 !important;
    left: 0 !important;
`;
const ImageDiv = styled.div`
  background: url(${({backimg})=>`${backimg}`});
  background-size: ${({maxwidth, maxheight})=>`${maxwidth ? `${maxwidth}px ${maxheight}px` : 'cover'}`};
  background-position: ${({rwidth})=>`${rwidth}px`} ${({rheight})=>`${rheight}px`};
  background-repeat: no-repeat;
  /* height: ${({rheight})=>`${rheight>0?rheight/5:'266'}px`}; */
  height: ${({maxheight})=>`${maxheight ? `${maxheight}px` : '300px'}`};  
  @media ${(props)=>props.theme.tabletS}{
    background: url(${({backimgCut})=>`${backimgCut}`});
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
    height: ${({maxheight})=>`${maxheight ? `${maxheight}px` : '300px'}`};  
  }
`;
const BoxThum = styled.div`
    overflow: hidden;
    text-align: center;
`

const Thum = ({cut}) => {    
    const thumImgRef = useRef();
    const imgRef = useRef();

    const [mountimg, setMountimg] = useState(''); // 25개의 이미지를 모아 놓은 것에 관한
    const [img, setImg] = useState(''); // 이미지 하나짜리 25개 짜리 변경하기 위한
    const [mousemove, setMousemove] = useState(false); // 마우스 move유무
    const [width, setWidth] = useState(0); // background position을 바꾸기 위한 width
    const [rheight, setHeight] = useState(0); // background position을 바꾸기 위한 height
    const [willmount, setWillmount] = useState(true);

    const [imgmaxwidth, setImgMaxWidth] = useState(0); // 25개 짜리 이미지 넓이 또는 하나 자리 넓이 세팅
    const [imgmaxheight, setImgMaxHeight] = useState(0); // 25개 짜리 이미지 높이 또는 하나 자리 높이 세팅
    
    // mouseout 
    const onMouseOut = useCallback(()=>{
        if(mousemove) {
            setImg(cut);
            const maxwidth = thumImgRef.current?thumImgRef.current.offsetWidth : 0;
            const maxheight = thumImgRef.current?maxwidth * 0.56 : 0;
            setImgMaxWidth(maxwidth);
            setImgMaxHeight(maxheight);
            setWillmount(true);
            setMousemove(false);
            setWidth(0);
            setHeight(0);
        }
    }, [cut, setImg, thumImgRef.current, setImgMaxWidth, setImgMaxHeight, setWillmount, mousemove, setMousemove]);

    // 25 big size img setting
    useEffect(()=>{
        if(mousemove) {
            const maxWidth = thumImgRef.current ? thumImgRef.current.offsetWidth * 5 : 0;
            const maxHeight = thumImgRef.current ? maxWidth * 0.56 : 0;
            setImgMaxWidth(maxWidth);
            setImgMaxHeight(maxHeight);
        }
    },[thumImgRef, mousemove, thumImgRef.current, setImgMaxWidth, setImgMaxHeight]);

    // mouse move event
    const onNotMove = (result) => {        
        if(window.innerWidth <= resizeOpt.tabletS) {
            const maxwidth = thumImgRef.current ? thumImgRef.current.offsetWidth : 0;
            const maxheight = thumImgRef.current?maxwidth * 0.56 : 0;

            setImgMaxWidth(maxwidth);
            setImgMaxHeight(maxheight);
            setWillmount(true);
            setMousemove(false);
            setWidth(0);
            setHeight(0);
        } else {
            setHeight(result);
        }
    }

    const handleMouseMove = useCallback((e) => {
        setMousemove(true);
        const mouseX = e.nativeEvent.offsetX;
        const widthOne = imgRef.current.offsetWidth / 3;
        const widthTwo = imgRef.current.offsetWidth / 3 * 2;
        const widthThree = imgRef.current.offsetWidth / 3 * 3;
        
        // first image
        if(mouseX >= 0 && mouseX < widthOne){
            setImg(`${mountimg}_y1.jpg`);
            const aw = widthOne / 25;
            const bw = mouseX / aw;
            const cw = Math.floor(bw);
            const dw = cw % 5;
            const resultWidth = (imgmaxwidth / 5) * dw;
            setWidth(resultWidth);
            
            const ah = widthOne / 5;
            const bh = mouseX / ah;
            const ch = Math.floor(bh);
            const dh = ch % 5;
            const resultHeight = imgmaxheight / 5 * dh;

            onNotMove(resultHeight);
        }
        //  second image
        if(mouseX >= widthOne && mouseX < widthTwo) {
            setImg(`${mountimg}_y2.jpg`);
            const aw = widthTwo / 25;
            const bw = mouseX / aw;
            const cw = Math.floor(bw);
            const dw = cw % 5;
            const resultWidth = (imgmaxwidth / 5) * dw;
            setWidth(resultWidth);

            const ah = widthTwo / 5;
            const bh = mouseX / ah;
            const ch = Math.floor(bh);
            const dh = ch % 5;
            const resultHeight = imgmaxheight / 5 * dh;
            
            onNotMove(resultHeight);
        };
        // third image
        if(mouseX >= widthTwo && mouseX < widthThree) {
            setImg(`${mountimg}_y3.jpg`);
            const aw = widthThree / 25;
            const bw = mouseX / aw;
            const cw = Math.floor(bw);
            const dw = cw % 5;
            const resultWidth = (imgmaxwidth / 5) * dw;
            setWidth(resultWidth);

            const ah = widthThree / 5;
            const bh = mouseX / ah;
            const ch = Math.floor(bh);
            const dh = ch % 5;
            const resultHeight = imgmaxheight / 5 * dh;
            
            onNotMove(resultHeight);
        };
    }, [mountimg, imgRef, cut, setWidth, setHeight, imgmaxwidth, imgmaxheight, setImg, setMousemove]);

    // resizing
    const resize = useCallback(() => {
        const maxWidth = thumImgRef.current ? thumImgRef.current.offsetWidth : 0;
        const maxHeight = thumImgRef.current ? maxWidth * 0.56 : 0;

        setImgMaxWidth(maxWidth);
        setImgMaxHeight(maxHeight);
    }, [thumImgRef.current, setImgMaxWidth, setImgMaxHeight]);

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [resize]);

    //최초 렌더시 이미지 및 사이즈 
    useEffect(()=>{
        const maxWidth = thumImgRef.current ? thumImgRef.current.offsetWidth : 0;
        const maxHeight = thumImgRef.current ? maxWidth * 0.56 : 0;
        
        if(!mousemove){
            const resultImg = cut.replace(/.jpg/gi, "");
            setMountimg(resultImg);
            setImg(cut);
            setImgMaxWidth(maxWidth);
            setImgMaxHeight(maxHeight);
            setWillmount(false);
        }
    }, [cut, setMountimg, setImg, thumImgRef.current, setImgMaxWidth, setImgMaxHeight])
    
    return (
        <ItemList>
            <BoxUpper>
                <BoxThum ref={thumImgRef} onMouseMove={handleMouseMove}  onMouseOut={onMouseOut}>
                    <a className="link_sample" href="https://tv.naver.com/naverd2" target="_blank">
                        <ImageDiv 
                            ref={imgRef} 
                            backimg={img} 
                            backimgCut={cut} 
                            maxwidth={imgmaxwidth} 
                            maxheight={imgmaxheight} 
                            rwidth={width>0?width*-1:width} 
                            rheight={rheight>0?rheight*-1:rheight}
                        />
                    </a>
                </BoxThum>
            </BoxUpper>
        </ItemList>
    )
}

export default Thum;