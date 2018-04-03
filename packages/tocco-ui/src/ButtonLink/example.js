/* eslint no-console: 0 */
import React from 'react'
import ButtonLink from './'
// real-import:import {ButtonLink} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <ButtonLink
        label="Base color flat"
      />
      <ButtonLink
        ink="primary"
        label="Primary color flat"
      />
      <ButtonLink
        label="Base color raised"
        look="raised"
      />
      <ButtonLink
        ink="primary"
        label="Primary color raised"
        look="raised"
      />
      <ButtonLink
        alt="Tocco favicon 60x60px"
        download="tocco-favicon-60x60px.png"
        icon="fa-file-image-o"
        href="url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABtlBMVEX////+/f316erjv8DPkJK8ZmiuRkimMjWfIyaeISTivb715+j68/PkwsPIgYKwS02jLTCeIiWjKy6wSkz58fH47u/Zqaq3Wl2iKi22V1nYpqf37e38+Pjhu7y3WlygJSi1VljguLny4uPFe3yjLC///v7oysu0U1WzUVPmxsf9/PzesrOrPkCpOz7cr7D+/PzZqKmlMjTdsrPnycrmxsby4eKzUlT8+fnhurvftbb37u60VFf26+ugJCfYpaf58vK3W16lMTO0U1bDdXfJg4T47/CoODrKhYfqzs/r0dHLiYqpOTzIgoO5XmDpzc7qz9C6YWOfJCfEeXuxTE7BcXP37OzEeHqvR0r05ublw8SkLjG6YWTivL3PkpTpzc3Mioy8Z2m5YGKsQkWnNTj69fW2WFqkLzLOjo/GfH779fbt1danNjnMiYvs09SqPD+uRUfz5OTGfH27ZGbs1NXEd3njv7/79vbt1tehKCumNDfGfX/RlpfcsLHCc3Xx4OCyT1KxTU/x3t7mxcWoNznkwMHaq63aqqvkwcLDdnjBcnT89/fdsbKhJyqhKSytREarP0HLh4jftrfg3cKtAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+ACAxAcJHS3V1AAAAKNSURBVEjH7ZbrWxJBFMYHRWAQjCULMgwRNotMoILimgIpl6ikUMsudrEiES3JSss0027a5T8OrWfYPTPLDl97er++83ues3Pec3YQ+q8/0rS1azt0egPGBr2uQ2vs1HCjJnPXAYuAiQTrwa72bi700GGbFVOyH+k5qoo6eo85MVPOPpejOdvvtmBFedz9TVDx+ICAm0g4cVJUYr2nBrGKTg952azPr1djMQ74fUz4DAdbp4dY7FnVmv9Wfo5mgwN8LMahIGTPu3lZjN2w3xcs/LAnLGcjNn4W42hMBvudrcDxhJS9OMw4MpJMpdOpZIARuuglCWym52h0LGOqZ1E0ZXN5yrQbJfBl6AqFKyRJmqvXxqFfbGyHtuuQvdEp/arSBKQnp4h58xbwCjIWodg0OGC9Tbw74E5G78IMZeB33yPWDHDGqH0n5sCR+8TSgR5l6Ohnwcg9IM5DuZE00fCjWfmZx8SJy40Ua9cUQT+IAb4nzWDRE3CoJVirBBs4yn6qVDa4SdaFlcHoNC4MtCqQpeFnc0qtgiHJUXWLFcWQaEE881RK5qsAbsTTCMd5Wr5nUATWZu0l3tQk8MYnSjK2CEdyYZGYmucY0i+WyHBolmbi0K9Jfjov7dDF1cr88p61/KpSpczXLkld3bOUj4U3tpXV1ZXhObUFiHriuAXJVy+KRVuBQ6AZYQ8/a38LUuBo4Uf3rgwztPael13foKP/Ic/Hbn5kDKy4FeBhA9vMp6TPz0ErPWiQd0u18s1thadUvXLzuspdfWr2/F37bFVG7V82UFN9DSeVHq6hb2WkplIitEOjO6FETBXdU8RVW5DN6O73mivChe7f+6KrUvixH/fdQdvPX0EvN/qv6zeriI5VYm202AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wMi0wM1QxNjoyODozNiswMTowMHZGJW4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDItMDNUMTY6Mjg6MzYrMDE6MDAHG53SAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC')"  // eslint-disable-line
        label="Download"
      />
      <ButtonLink
        alt="alt text"
        label="Link with alternative text and title"
        title="title text"
      />
      {/* end example */}
    </div>
  )
}
