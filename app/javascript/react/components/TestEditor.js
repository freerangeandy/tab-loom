import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import {convertToColumnFormat} from './convertToColumnFormat'

const template = `
e|-----------------|----------------|----------------|----------------|<br>
B|-----------------|----------------|----------------|----------------|<br>
G|-----------------|----------------|----------------|----------------|<br>
D|-----------------|----------------|----------------|----------------|<br>
A|-----------------|----------------|----------------|----------------|<br>
E|-----------------|----------------|----------------|----------------|
`

const TestEditor = props => {

  return (
    <div className="foobar">
      <CKEditor

        editor={ ClassicEditor }
        data={template}
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        } }
        
        config={{
          toolbar: ['bold']
        }}

        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
        } }
        onBlur={ ( event, editor ) => {
          console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
          console.log( 'Focus.', editor );
        } }
      />
    </div>
  )
}

export default TestEditor
