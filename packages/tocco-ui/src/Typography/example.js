/* esLint no-console: 0 */
import React from 'react'
import {B, Code, Dd, Del, Dl, Dt, Em, H1, H2, H3, H4, H5, H6, I, Ins, Kbd, Li,
  Mark, Ol, P, Pre, Q, S, Span, Strong, Sub, Sup, U, Ul, Var} from './'
// eslint-disable-next-line
// real-import:import {B, Code, Dd, Del, Dl, Dt, Em, H1, H2, H3, H4, H5, H6, I, Ins, Kbd, Li, Mark, Ol, P, Pre, Q, S, Span, Strong, Sub, Sup, U, Ul, Var} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <H1>Heading 1</H1>
      <H2 breakWords={false}>Heading 2 supercalifragilisticexpialidocious</H2>
      <H3>Heading 3 supercalifragilisticexpialidocious</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>
      <H1 styledLike="H3">H1 styled Like H3</H1>
      <P>&lt;P&gt;Laborum est molLit&lt;/P&gt;</P>
      &lt;Span&gt;<Span>Laborum est molLit</Span>&lt;/Span&gt;<br/>
      &lt;B&gt;<B>Laborum est molLit</B>&lt;/B&gt;<br/>
      &lt;Strong&gt;<Strong>Laborum est molLit</Strong>&lt;/Strong&gt;<br/>
      &lt;I&gt;<I>Laborum est molLit</I>&lt;/I&gt;<br/>
      &lt;Em&gt;<Em>Laborum est molLit</Em>&lt;/Em&gt;<br/>
      &lt;U&gt;<U>Laborum est molLit</U>&lt;/U&gt;<br/>
      &lt;S&gt;<S>Laborum est molLit</S>&lt;/S&gt;<br/>
      &lt;Del&gt;<Del>Laborum est molLit</Del>&lt;/Del&gt;<br/>
      &lt;Ins&gt;<Ins>Laborum est molLit</Ins>&lt;/Ins&gt;<br/>
      &lt;Sup&gt;<Sup>Laborum est molLit</Sup>&lt;/Sup&gt;<br/>
      &lt;Sub&gt;<Sub>Laborum est molLit</Sub>&lt;/Sub&gt;<br/>
      &lt;Q&gt;<Q>Laborum est molLit</Q>&lt;/Q&gt;<br/>
      &lt;Var&gt;<Var>Laborum est molLit</Var>&lt;/Var&gt;<br/>
      &lt;Code&gt;<Code>Laborum est molLit</Code>&lt;/Code&gt;<br/>
      &lt;Kbd&gt;<Kbd>CMD & A</Kbd>&lt;/Kbd&gt;<br/>
      &lt;Mark&gt;<Mark>Laborum est molLit</Mark>&lt;/Mark&gt;<br/>
      <Pre>&lt;Pre&gt;Laborum est molLit&lt;Pre&gt;</Pre><br/>
      <Ul>
        <Li>dolore eu fugiat</Li>
        <Li>in reprehenderit aute
          <Ul>
            <Li>dolore eu fugiat</Li>
            <Li>in reprehenderit aute</Li>
          </Ul>
        </Li>
        <Li>Lorem ipsum dolor sit amet, consectetur adipisicing eLit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aLiqua. Irure
            dolor in reprehenderit in voluptate veLit esse cillum dolore eu
            fugiat nUlla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in cUlpa qui officia deserunt ut enim ad minim
            veniam, quis nostrud exercitation Ullamco laboris nisi ut aLiquip
            ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipisicing
            eLit.</Li>
        <Li>consectetur adipisicing</Li>
      </Ul>
      <Ol>
        <Li>dolore eu fugiat</Li>
        <Li>in reprehenderit aute
          <Ol>
            <Li>dolore eu fugiat</Li>
            <Li>in reprehenderit aute</Li>
          </Ol>
        </Li>
        <Li>Lorem ipsum dolor sit amet, consectetur adipisicing eLit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aLiqua. Irure
            dolor in reprehenderit in voluptate veLit esse cillum dolore eu
            fugiat nUlla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in cUlpa qui officia deserunt ut enim ad minim
            veniam, quis nostrud exercitation Ullamco laboris nisi ut aLiquip
            ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipisicing
            eLit.</Li>
        <Li>consectetur adipisicing</Li>
      </Ol>
      <Dl>
        <Dt>Lorem ipsum</Dt>
        <Dd>Lorem ipsum dolor sit amet, consectetur adipisicing eLit.</Dd>
        <Dt>Excepteur sint occaecat</Dt>
        <Dd>Excepteur sint occaecat cupidatat non proident, sunt in cUlpa qui officia.</Dd>
      </Dl>
      {/* end example */}
    </div>
  )
}
