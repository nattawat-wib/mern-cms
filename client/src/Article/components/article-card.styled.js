import styled, { useTheme } from "styled-components";
import { Typography, Paper } from "@mui/material";

export const CardWrapper = styled(Paper)`
    background-color: #fff;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.1);
    border-radius: 10px;
    padding: 1rem;
    transition: .3s ease;
    
    &:hover {
        box-shadow: 0 0 24px 0 rgba(0,0,0,.19);
        transition: .3s ease;
        transform: translateY(-5px)
    }
`

export const CardTitle = styled(Typography)`
    // color: #ff0900;
    height: 65px;
    // font-size: 1.5rem;
    padding: 7px 2px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`

export const CartDetail = styled.p`
    height: 96px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;    
`

export const CardThumbnail = styled.figure`
    position: relative;
    padding-top 56.36%;
    border-radius: inherit;
    overflow: hidden;
`