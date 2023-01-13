import React from "react";
import { User } from "@nextui-org/react";
import { Container, Row, Col, Text } from "@nextui-org/react";
import { Input, useInput, Grid } from "@nextui-org/react";
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";

const Footer = () => {
  const { value, reset, bindings } = useInput("");

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  return (
    <div>
      
      <div style={{ background: "#222222", marginTop: 30 }}>
        

        
          <Row>
            <Col
              style={{
                fontSize: 30,
                marginTop: 150,
                
              
                resize: true,
              }}
            >
              <div >
                <a href="https://www.linkedin.com/in/dhruvjohari/">
                  <User
                    src="https://img.icons8.com/material-rounded/96/null/linkedin--v1.png"
                  
                    size="lg"
                  />
                </a>

                <a href="https://github.com/Dhruvjohari19">
                  <User
                    src="https://img.icons8.com/sf-regular/96/null/github.png"
                    size="lg"
                  />
                </a>

                <a href="https://twitter.com/JohariDhruv">
                  <User
                    src="https://img.icons8.com/color/144/null/twitter--v1.png"
                    size="lg"
                  />
                </a>
              </div>
            </Col>

            <Col style={{ color: "#22A39F", fontFamily: "sans-serif",marginTop:20, }} b>
              <span style={{ fontSize: 30 }}>GET IN TOUCH</span>
              <div>
                <Grid.Container gap={2} style={{ flexDirection: "column" }}>
                  <Grid>
                    <Input
                      clearable
                      helperText="Please enter your name"
                      placeholder="Enter your name"
                    />
                  </Grid>
                  <Grid>
                    <Input
                      {...bindings}
                      clearable
                      shadow={false}
                      onClearClick={reset}
                      status={helper.color}
                      color={helper.color}
                      helperColor={helper.color}
                      helperText={helper.text}
                      type="email"
                      placeholder="abc@gmail.com"
                    />
                  </Grid>
                  <Grid>
                    <Input
                      style={{ height: 90 }}
                      clearable
                      contentRightStyling={false}
                      placeholder="Type your message..."
                      contentRight={
                        <SendButton>
                          <SendIcon />
                        </SendButton>
                      }
                    />
                  </Grid>
                </Grid.Container>
              </div>
            </Col>
          </Row>
          <Row
            style={{ justifyContent: "center", marginTop: 70, resize: true }}
          >
            <div style={{ position: "relative" }}>
              <Text style={{ color: "#22A39F" }} b>
                <i>Build & Design By Dhruv Johari </i>🙂
              </Text>
            </div>
          </Row>
     
      </div>
     
    </div>
  );
};

export default Footer;
