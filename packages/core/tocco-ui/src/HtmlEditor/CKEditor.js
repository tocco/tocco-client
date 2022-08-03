// eslint-disable-next-line import/order
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport'
import HtmlComment from '@ckeditor/ckeditor5-html-support/src/htmlcomment'
import ImageBlock from '@ckeditor/ckeditor5-image/src/imageblock'
import ImageInline from '@ckeditor/ckeditor5-image/src/imageinline'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'

import {fontColor, fontFamily, fontSize, heading, table, link, htmlSupport} from './config'

class Editor extends ClassicEditor {}

Editor.builtinPlugins = [
  Autoformat,
  Bold,
  Clipboard,
  Essentials,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  ImageBlock,
  ImageInline,
  Italic,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SourceEditing,
  Strikethrough,
  Table,
  TableToolbar,
  TextTransformation,
  Underline
]

Editor.defaultConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'removeFormat',
      '|',
      'heading',
      'fontFamily',
      'fontSize',
      'fontColor',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'link',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo',
      '|',
      'sourceEditing'
    ]
  },
  language: {
    ui: 'de',
    content: 'de'
  },
  link,
  htmlSupport,
  table,
  heading,
  fontFamily,
  fontSize,
  fontColor
}

export default Editor
