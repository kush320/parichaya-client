import React from "react";
import { Grid, GridItem, Box,  } from "@chakra-ui/react";
import { Tabs, TabList, Tab} from "@chakra-ui/react";
import { PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
// import { IconButton } from '@chakra-ui/react'

import "./Register.css";
import { useEffect, useState} from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import {  PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'

export default function Register() {
  const navigate = useNavigate("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

 

  return (
    <>
      
      <div className="wrapper1">
     
        
        
        <Grid className="row" templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem
            className="column"
            rowSpan={2}
            
            w="150%"
            bg="#0a81ff"
          >
            <center>
              <div className="rem">PARICHAYA</div>
            </center>
            <Tabs variant='unstyled'>
              <TabList >
                <Grid gridRowGap={2} >
                  <GridItem marginTop={20} marginLeft={20} >
                {/* <div className="nan"> */}
                  <Tab  _selected={{ color: "blue", bg: "white" }}>
                    <Link to="search">
                    <p><SearchIcon marginRight={2}/>Search National Identity</p>
                    </Link>
                  </Tab>
                  </GridItem>
                {/* </div> */}
                
                
                {/* <div className="reg"> */}
                <GridItem marginLeft={20}>
                  <Tab _selected={{ color: "blue", bg: "white" }}>
                    <Link to="addNid">
                      <p> <PlusSquareIcon marginRight={2}/>Register National Identity</p>
                    </Link>
                  </Tab>
                  </GridItem>
                {/* </div> */}
                </Grid>
              </TabList>
            </Tabs>

            <div className="log">
              <Box
                as="button"
                borderRadius="md"
                bg="blue"
                color="white"
                px={4}
                h={8}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                LogOut{" "}
              </Box>
            </div>
          </GridItem>
          {/* <GridItem colStart={4} colEnd={6} h='10' bg='papayawhip' /> */}
        </Grid>
        
      </div>
    </>
  );
}
