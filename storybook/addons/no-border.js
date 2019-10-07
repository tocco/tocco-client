import React from 'react'
export default story => {
  return <div>
    <style>{'\
        .sb-show-main {\
          padding: 0;\
        }\
      '}</style>
    <div>{story()}</div>
  </div>
}
