import {
  declareOverlay
} from '../utilStyles'

const colors = {
  hex: {
    valid: {
      '3': '#123',
      '6': '#afAF09'
    },
    invalid: {
      '2': '#12',
      '4': '#1234',
      '5': '#12345',
      '6': '123456',
      '7': '#1234567'
    }
  },
  rgb: {
    valid: {
      '0': 'rgb(0,0,0)',
      '12': 'rgb(12,12,12)',
      '123': 'rgb(123,123,123)',
      '255': 'rgb(255, 255, 255)'
    },
    invalid: {
      hasAlpha: 'rgb(0,0,0,1)',
      has2Colors: 'rgb(123,123)',
      has4Colors: 'rgb(123,123,123,123)',
      hasX: 'rgb(x,0,0)',
      hasSpace: 'rgb (0,0,0)'
    }
  },
  rgba: {
    valid: {
      '0': 'rgba(0,0,0,.3)',
      '12': 'rgba(12,12,12,0.3)',
      '123': 'rgba(123,123,123,0.3)',
      '255': 'rgba(255, 255, 255, 0.3)'
    },
    invalid: {
      hasNoAlpha: 'rgba(0,0,0)',
      hasExceedingAlpha: 'rgba(0,0,0,1.1)',
      hasUndercutAlpha: 'rgba(0,0,0,-1)',
      has2Colors: 'rgba(123,123)',
      has4Colors: 'rgba(123,123,123,123)',
      hasX: 'rgba(x,0,0)',
      hasSpace: 'rgba (0,0,0)'
    }
  }
}

const opacity = {
  valid: {
    floorRange: 0,
    ceilRange: 1,
    float: 0.51
  },
  invalid: {
    undercutRange: -1,
    exceedRange: 1.1,
    notNumber: 'A'
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareOverlay', () => {
      it('should declare pseudo element to cover parent completely and stain it', () => {
        const css = declareOverlay(colors.rgb.valid['0'], opacity.valid.ceilRange)
        expect(css).to.match(/&:after/)
        expect(css).to.match(/content: '';/)
        expect(css).to.match(/position: absolute;/)
        expect(css).to.match(/top: 0;/)
        expect(css).to.match(/right: 0;/)
        expect(css).to.match(/bottom: 0;/)
        expect(css).to.match(/left: 0;/)
        expect(css).to.match(/background-color: rgb\(0,0,0\);/)
        expect(css).to.match(/opacity: 1;/)
        expect(css).to.match(/border-radius: inherit;/)
      })

      it('should throw an error for invalid color', () => {
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['6'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.invalid['2'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.invalid['4'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.invalid['5'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.invalid['6'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.invalid['7'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.valid['0'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.valid['12'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.valid['123'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.valid['255'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.invalid['hasAlpha'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.invalid['has2Colors'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgba.invalid['has4Colors'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgba.invalid['hasX'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgba.invalid['hasSpace'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgb.valid['0'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgb.valid['12'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgb.valid['123'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgb.valid['255'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['hasNoAlpha'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['hasExceedingAlpha'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['hasUndercutAlpha'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['has2Colors'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['has4Colors'], opacity.valid.ceilRange)).to.throw()  // eslint-disable-line
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['hasX'], opacity.valid.ceilRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.rgb.invalid['hasSpace'], opacity.valid.ceilRange)).to.throw()
      })

      it('should throw an error for invalid opacity', () => {
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.invalid.undercutRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.invalid.exceedRange)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.invalid.notNumber)).to.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.valid.floorRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.valid.ceilRange)).to.not.throw()
        expect(declareOverlay.bind(declareOverlay, colors.hex.valid['3'], opacity.valid.float)).to.not.throw()
      })
    })
  })
})
