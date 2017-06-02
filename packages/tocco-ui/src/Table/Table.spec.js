import React from 'react'
import Table from './Table'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Table', function() {
    it('should render a html table', () => {
      const wrapper = shallow(
        <Table records={[]} columnDefinitions={[]}/>
      )
      expect(wrapper.find('table')).to.have.length(1)
    })

    it('should render the right amount of records', () => {
      const recordsAmount = 100
      const records = []
      for (let i = 0; i < recordsAmount; i++) {
        records.push({values: {a: {value: i.toString(), type: 'string'}}})
      }

      const wrapper = shallow(
        <Table records={records} columnDefinitions={[{values: [{name: 'a'}]}]}/>
      )
      expect(wrapper.find('tr')).to.have.length(recordsAmount + 1) // +1 for header row
    })

    it('should show a label if provided and default value if not', () => {
      const records = [
        {values: {a: {value: 'a1', type: 'string'}}},
        {values: {b: {value: 'b1', type: 'string'}}},
        {values: {c: {value: 'c1', type: 'string'}}}
      ]

      const columnDefinitions = [
        {
          values: [{name: 'a'}]
        },
        {
          values: [{name: 'c'}],
          label: 'CLabel',
          order: 1
        }
      ]

      const wrapper = shallow(
        <Table records={records} columnDefinitions={columnDefinitions}/>
      )

      expect(wrapper.find('th').last().text()).to.equal('a')
      expect(wrapper.find('th').first().text()).to.equal('CLabel')
    })

    it('should render the right amount of columns and order them ', () => {
      const records = [
        {
          values: {
            a: {value: 'a1', type: 'string'},
            b: {value: 'b1', type: 'string'},
            c: {value: 'c1', type: 'string'}
          }
        },
        {
          values: {
            a: {value: 'a2', type: 'string'},
            b: {value: 'b2', type: 'string'},
            c: {value: 'c2', type: 'string'}
          }
        },
        {
          values: {
            a: {value: 'a3', type: 'string'},
            b: {value: 'b3', type: 'string'},
            c: {value: 'c3', type: 'string'}
          }
        }
      ]

      const columnDefinitions = [
        {
          values: [{name: 'a'}],
          label: 'ALabel',
          order: 30
        },
        {
          values: [{name: 'c'}],
          label: 'CLabel',
          order: 1
        }
      ]

      const wrapper = shallow(
        <Table records={records} columnDefinitions={columnDefinitions}/>
      )

      expect(wrapper.find('th').first().text()).to.equal('CLabel')
      expect(wrapper.find('th').last().text()).to.equal('ALabel')

      expect(wrapper.contains(<th>BLabel</th>)).to.be.false

      expect(wrapper.contains('a1')).to.be.true
      expect(wrapper.contains('a2')).to.be.true
      expect(wrapper.contains('a3')).to.be.true

      expect(wrapper.contains('b1')).to.be.false
      expect(wrapper.contains('b2')).to.be.false
      expect(wrapper.contains('b3')).to.be.false

      expect(wrapper.contains('c1')).to.be.true
      expect(wrapper.contains('c2')).to.be.true
      expect(wrapper.contains('c3')).to.be.true
    })

    it('should join multiple cell values', () => {
      const record = {values: {a: {value: 'a', type: 'string'}, b: {value: 'b', type: 'string'}}}

      const wrapper = shallow(
        <Table records={[record]} columnDefinitions={[{values: [{name: 'a'}, {name: 'b'}]}]}/>
      )

      expect(wrapper.contains('a, b')).to.be.true
    })

    it('should ignore unknown column', () => {
      const record = {values: {a: {value: 'a', type: 'string'}}}

      const wrapper = shallow(
        <Table records={[record]} columnDefinitions={[{values: [{name: 'unknown'}]}]}/>
      )

      expect(wrapper.find('td')).to.have.text('')
    })

    it('should add class attribute to table', () => {
      const wrapper = shallow(
        <Table className="table-striped abc" records={[]} columnDefinitions={[]}/>
      )
      expect(wrapper.find('table.table-striped.abc')).to.have.length(1)
    })

    it('should add a order-by-change click handler', () => {
      const record = {values: {a: {value: 'a', type: 'string'}, b: {value: 'b', type: 'string'}}}

      const onClick = sinon.spy()
      const wrapper = shallow(
        <Table
          onOrderByChange={onClick}
          records={[record]}
          columnDefinitions={[{values: [{name: 'a'}]}, {values: [{name: 'b'}]}]}
        />
      )

      wrapper.find('tr').first().find('th').first().simulate('click')

      expect(onClick).to.have.calledOnce
      expect(onClick).to.have.been.calledWith({name: 'a', direction: 'desc'})

      wrapper.find('tr').first().find('th').first().simulate('click')

      expect(onClick).to.have.calledTwice
      expect(onClick).to.have.been.calledWith({name: 'a', direction: 'asc'})

      wrapper.find('tr').first().find('th').last().simulate('click')

      expect(onClick).to.have.calledThrice
      expect(onClick).to.have.been.calledWith({name: 'b', direction: 'desc'})
    })

    it('should add a order-by-change click handler with default ordering', () => {
      const record = {values: {a: {value: 'a', type: 'string'}, b: {value: 'b', type: 'string'}}}
      const orderBy = {
        name: 'a',
        direction: 'desc'
      }

      const onClick = sinon.spy()
      const wrapper = shallow(
        <Table
          onOrderByChange={onClick}
          orderBy={orderBy}
          records={[record]}
          columnDefinitions={[{values: [{name: 'a'}]}, {values: [{name: 'b'}]}]}
        />
      )

      wrapper.find('tr').first().find('th').first().simulate('click')

      expect(onClick).to.have.calledOnce
      expect(onClick).to.have.been.calledWith({name: 'a', direction: 'asc'})
    })

    it('should add a row click handler', () => {
      const record = {id: 99, values: {a: {value: 'a', type: 'string'}}}

      const onClick = sinon.spy()
      const wrapper = shallow(
        <Table onRowClick={onClick} records={[record]} columnDefinitions={[{values: [{name: 'a'}]}]}/>
      )

      wrapper.find('tr').last().simulate('click')

      expect(onClick).to.have.calledOnce
      expect(onClick).to.have.been.calledWith(99, record)
    })

    it('should use the cell renderer', () => {
      const record = {values: {a: {value: 'a', type: 'string'}, b: {value: 'b', type: 'string'}}}

      const cellRenderer = sinon.spy()
      const columnDefinitions = [{values: [{name: 'a'}]}, {values: [{name: 'b'}]}]
      shallow(
        <Table cellRenderer={cellRenderer} records={[record]} columnDefinitions={columnDefinitions}/>
      )

      expect(cellRenderer).to.have.calledTwice
      expect(cellRenderer).to.have.been.calledWith([record.values.a], record)
      expect(cellRenderer).to.have.been.calledWith([record.values.b], record)
    })
  })
})
