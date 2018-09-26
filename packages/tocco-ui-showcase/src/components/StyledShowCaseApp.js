import styled from 'styled-components'

const StyledShowCaseApp = styled.div`
  && {
    h1 {
      font-size: initial;
    }

    .show-case-app {
      margin: 0;
    }

    .title {
      color: #fff;
      font-size: 2.71rem;
      padding-top: .71rem;
      padding-left: .71rem;
      background-color: #87081e;
      height: 5.71rem;
    }

    .panel .table {
      td:nth-child( 1 ),
      td:nth-child( 2 ) {
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
      }
    }

    .navi-affix.affix {
      top: 0;
      bottom: 0;
      overflow-y: scroll;
    }

    .navigation {
      margin-top: 1.42rem;

      a {
        color: #000;
        text-decoration: none;
        padding-left: .71rem;
        padding-bottom: .14rem;
      }

      ul {
        padding-left: 0;
      }

      li {
        list-style-type: none;
      }

      ul li {
        font-weight: 500;
        padding-left: .35rem;
      }

      ul > li > ul > li {
        font-weight: normal;
      }

      > ul > li.current-nav > a {
        border-left: .14rem solid #87081e;
        color: #87081e;
      }

      ul > li.current-nav > ul > li.current-nav {
        a {
          color: #87081e;
        }
        border-left: .14rem solid #87081e;
      }
    }

    .show-case {
      margin-left: .71rem;
    }

    .locale-switcher{
      .flag{
        margin-left: .14rem;
        width: 1.42rem;
        opacity: .4;
        cursor: pointer;

        &.active {
          opacity: 1;
        }
      }
    }
  }
`

export default StyledShowCaseApp
