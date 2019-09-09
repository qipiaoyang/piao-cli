
let SERVER = "";


switch (process.env.API_ENV) {
  case "dev":
    SERVER = "//www.api-test.com";
    break;
  case "prd":
    SERVER = "//www.api-test.com";
    break;
  case "prod":
    SERVER = "//www.api-test.com";
    break;  
  case "shengtian":
    SERVER = "//www.api-test.com";
    break;   
  case "yungengxin":
    SERVER = "//www.api-test.com";
    break;  
  case "zhuzhan":
    SERVER = "//www.api-test.com";
    break;    
  case "shengtianTest":
    SERVER = "//www.api-test.com";
    break;   
  default:
    // WEBSITE = "";
    SERVER = "//www.api-test.com";
}



export const server = SERVER;
