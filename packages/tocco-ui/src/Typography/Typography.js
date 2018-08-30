import React from 'react'

import InjectFontRoboto from './Font'

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6
} from './Heading'
import {
  Dd,
  Dt,
  Dl,
  Li,
  Ol,
  Ul
} from './List'
import {
  B,
  Code,
  Del,
  Em,
  Figcaption,
  I,
  Ins,
  Kbd,
  Mark,
  P,
  Pre,
  Q,
  S,
  Small,
  Span,
  Strong,
  Sub,
  Sup,
  Time,
  U,
  Var
} from './Misc'

/**
 * Utilize only React components (e.g. <Span>) instead of pure html tags (e.g. <span>)
 * ensure coherent typography and prevent css leaking. Default Fonts are loaded
 * automatically. When other fonts are defined it is required to load font files
 * manually and to define corresponding @font-face.
 */
class Typography extends React.Component {
  static B = B
  static Code = Code
  static Dd = Dd
  static Del = Del
  static Dl = Dl
  static Dt = Dt
  static Em = Em
  static Figcaption = Figcaption
  static H1 = H1
  static H2 = H2
  static H3 = H3
  static H4 = H4
  static H5 = H5
  static H6 = H6
  static I = I
  static Ins = Ins
  static InjectFontRoboto = InjectFontRoboto
  static Kbd = Kbd
  static Li = Li
  static Mark = Mark
  static Ol = Ol
  static P = P
  static Pre = Pre
  static Q = Q
  static S = S
  static Small = Small
  static Span = Span
  static Strong = Strong
  static Sub = Sub
  static Sup = Sup
  static Time = Time
  static U = U
  static Ul = Ul
  static Var = Var

  render() {
    return <React.Fragment />
  }
}

export default Typography
