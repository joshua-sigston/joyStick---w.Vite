import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Poppins', sans-serif;
        background-color: whitesmoke;
    }

    h1, h2, {
        font-family: 'Anuphan', sans-serif;
    }

    a {
        text-decoration: none;
    }

    form {
        width: clamp(225px, 40%, 400px);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    button {
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        padding: .3em .5em;
        border: none;
        border-radius: .3rem;
        background-color: #355C7D;
        color: #fff;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
`

export default GlobalStyles