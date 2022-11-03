import {SidepanelContainer, Sidepanel, SidepanelHeader, SidepanelMainContent} from './'

export default {
  title: 'Tocco-UI/Sidepanel',
  component: SidepanelContainer,
  argTypes: {
    sidepanelPosition: {control: 'radio', options: ['top', 'left']},
    scrollBehaviour: {control: 'radio', options: ['none', 'inline'], defaultValue: 'none'},
    setSidepanelCollapsed: {action: 'setSidepanelCollapsed'},
    children: {table: {disable: true}}
  }
}

const Template = args => {
  return (
    <SidepanelContainer {...args}>
      <Sidepanel>
        <SidepanelHeader />
        <div>Sidepanel</div>
      </Sidepanel>
      <SidepanelMainContent>
        <div>Content</div>
      </SidepanelMainContent>
    </SidepanelContainer>
  )
}

export const TopSidepanel = Template.bind({})
TopSidepanel.args = {
  sidepanelPosition: 'top',
  sidepanelCollapsed: false
}

export const LeftSidepanel = Template.bind({})
LeftSidepanel.args = {
  sidepanelPosition: 'left',
  sidepanelCollapsed: false
}
