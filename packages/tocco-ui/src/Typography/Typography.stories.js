import React from 'react'
import {storiesOf} from '@storybook/react'

import Typography from './'

storiesOf('Tocco-UI | Typography', module)
  .add(
    'Typography',
    () =>
      <div>
        <Typography.H1>Heading 1</Typography.H1>
        <Typography.H2 breakWords={false}>Heading 2 supercalifragilisticexpialidocious</Typography.H2>
        <Typography.H3>Heading 3 supercalifragilisticexpialidocious</Typography.H3>
        <Typography.H4>Heading 4 <Typography.Small>Small byline</Typography.Small></Typography.H4>
        <Typography.H5>Heading 5 <Typography.Small>Small byline</Typography.Small></Typography.H5>
        <Typography.H6>Heading 6 <Typography.Small>Small byline</Typography.Small></Typography.H6>
        <Typography.H1 styledLike="H3">H1 styled Like H3</Typography.H1>
        <Typography.P>&lt;P&gt;Laborum est molLit&lt;/P&gt;</Typography.P>
        &lt;Span&gt;<Typography.Span>Laborum est molLit</Typography.Span>&lt;/Span&gt;<br/>
        &lt;B&gt;<Typography.B>Laborum est molLit</Typography.B>&lt;/B&gt;<br/>
        &lt;Strong&gt;<Typography.Strong>Laborum est molLit</Typography.Strong>&lt;/Strong&gt;<br/>
        &lt;I&gt;<Typography.I>Laborum est molLit</Typography.I>&lt;/I&gt;<br/>
        &lt;Em&gt;<Typography.Em>Laborum est molLit</Typography.Em>&lt;/Em&gt;<br/>
        &lt;U&gt;<Typography.U>Laborum est molLit</Typography.U>&lt;/U&gt;<br/>
        &lt;S&gt;<Typography.S>Laborum est molLit</Typography.S>&lt;/S&gt;<br/>
        &lt;Del&gt;<Typography.Del>Laborum est molLit</Typography.Del>&lt;/Del&gt;<br/>
        &lt;Ins&gt;<Typography.Ins>Laborum est molLit</Typography.Ins>&lt;/Ins&gt;<br/>
        &lt;Sup&gt;<Typography.Sup>Laborum est molLit</Typography.Sup>&lt;/Sup&gt;<br/>
        &lt;Sub&gt;<Typography.Sub>Laborum est molLit</Typography.Sub>&lt;/Sub&gt;<br/>
        &lt;Q&gt;<Typography.Q>Laborum est molLit</Typography.Q>&lt;/Q&gt;<br/>
        &lt;Var&gt;<Typography.Var>Laborum est molLit</Typography.Var>&lt;/Var&gt;<br/>
        &lt;Code&gt;<Typography.Code>Laborum est molLit</Typography.Code>&lt;/Code&gt;<br/>
        &lt;Kbd&gt;<Typography.Kbd>CMD & A</Typography.Kbd>&lt;/Kbd&gt;<br/>
        &lt;Mark&gt;<Typography.Mark>Laborum est molLit</Typography.Mark>&lt;/Mark&gt;<br/>
        <Typography.Figcaption>&lt;Figcaption&gt;Laborum est molLit&lt;/Figcaption&gt;</Typography.Figcaption>
        <Typography.Time dateTime="15:13:00">15:13:00</Typography.Time>
        <Typography.Pre>&lt;Pre&gt;Laborum est molLit&lt;Pre&gt;</Typography.Pre>
        <Typography.Ul>
          <Typography.Li>dolore eu fugiat</Typography.Li>
          <Typography.Li>in reprehenderit aute
            <Typography.Ul>
              <Typography.Li>dolore eu fugiat</Typography.Li>
              <Typography.Li>in reprehenderit aute</Typography.Li>
            </Typography.Ul>
          </Typography.Li>
          <Typography.Li>Lorem ipsum dolor sit amet, consectetur adipisicing eLit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aLiqua. Irure
          dolor in reprehenderit in voluptate veLit esse cillum dolore eu
          fugiat nUlla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in cUlpa qui officia deserunt ut enim ad minim
          veniam, quis nostrud exercitation Ullamco laboris nisi ut aLiquip
          ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipisicing
          eLit.</Typography.Li>
          <Typography.Li>consectetur adipisicing</Typography.Li>
        </Typography.Ul>
        <Typography.Ol>
          <Typography.Li>dolore eu fugiat</Typography.Li>
          <Typography.Li>in reprehenderit aute
            <Typography.Ol>
              <Typography.Li>dolore eu fugiat</Typography.Li>
              <Typography.Li>in reprehenderit aute</Typography.Li>
            </Typography.Ol>
          </Typography.Li>
          <Typography.Li>Lorem ipsum dolor sit amet, consectetur adipisicing eLit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aLiqua. Irure
          dolor in reprehenderit in voluptate veLit esse cillum dolore eu
          fugiat nUlla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in cUlpa qui officia deserunt ut enim ad minim
          veniam, quis nostrud exercitation Ullamco laboris nisi ut aLiquip
          ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipisicing
          eLit.</Typography.Li>
          <Typography.Li>consectetur adipisicing</Typography.Li>
        </Typography.Ol>
        <Typography.Dl>
          <Typography.Dt>Lorem ipsum</Typography.Dt>
          <Typography.Dd>Lorem ipsum dolor sit amet, consectetur adipisicing eLit.</Typography.Dd>
          <Typography.Dt>Excepteur sint occaecat</Typography.Dt>
          <Typography.Dd>Excepteur sint occaecat cupidatat non proident, sunt in cUlpa qui officia.</Typography.Dd>
        </Typography.Dl>
      </div>
  )
