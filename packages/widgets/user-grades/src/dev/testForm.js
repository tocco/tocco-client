export const listForm = {
  id: 'User_grades_detail_relRating_list',
  componentType: 'form',
  children: [
    {
      id: 'table',
      componentType: 'table',
      children: [
        {
          id: 'id_name',
          componentType: 'column',
          children: [
            {
              id: 'id_name',
              componentType: 'display'
            }
          ]
        },
        {
          id: 'relExam.date',
          componentType: 'column',
          children: [
            {
              id: 'relExam.date',
              componentType: 'field'
            }
          ]
        },
        {
          id: 'relExam.weight',
          componentType: 'column',
          children: [
            {
              id: 'relExam.weight',
              componentType: 'field'
            }
          ]
        },
        {
          id: 'grade',
          componentType: 'column',
          children: [
            {
              id: 'grade',
              componentType: 'field'
            }
          ]
        },
        {
          id: 'relExam.max_points',
          componentType: 'column',
          children: [
            {
              id: 'relExam.max_points',
              componentType: 'field'
            }
          ]
        },
        {
          id: 'points',
          componentType: 'column',
          children: [
            {
              id: 'points',
              componentType: 'field'
            }
          ]
        }
      ],
      layoutType: 'table'
    }
  ]
}

export const detailForm = {
  id: 'User_grades_detail',
  componentType: 'form',
  children: [
    {
      id: 'box1',
      componentType: 'layout',
      children: [
        {
          id: 'box1',
          componentType: 'layout',
          children: [
            {
              id: 'master_data',
              componentType: 'layout',
              children: [
                {
                  id: 'relUser.firstname',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relUser.firstname',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'relUser.lastname',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relUser.lastname',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'relInput.relEvent',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relInput.relEvent',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'relInput.relInput_node',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relInput.relInput_node',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'relInput.relInput_node.relInput_type',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relInput.relInput_node.relInput_type',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'relInput.num_ratings',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relInput.num_ratings',
                      componentType: 'field'
                    }
                  ]
                }
              ],
              layoutType: 'vertical-box'
            },
            {
              id: 'result',
              componentType: 'layout',
              children: [
                {
                  id: 'definate_grade',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'definate_grade',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'pre_grade',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'pre_grade',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'value',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'value',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'percentage_reached',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'percentage_reached',
                      componentType: 'display'
                    }
                  ]
                },
                {
                  id: 'relInput.relInput_node.points_max',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relInput.relInput_node.points_max',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'relChoice_rating_value.label',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relChoice_rating_value.label',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'text',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'text',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'calculated_presence',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'calculated_presence',
                      componentType: 'field'
                    }
                  ]
                },
                {
                  id: 'dispense',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'dispense',
                      componentType: 'field'
                    }
                  ]
                }
              ],
              layoutType: 'vertical-box'
            },
            {
              id: 'no_ratings',
              componentType: 'layout',
              children: [
                {
                  id: 'no_ratings',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'no_ratings',
                      componentType: 'display'
                    }
                  ]
                }
              ],
              layoutType: 'vertical-box'
            },
            {
              id: 'ratings',
              componentType: 'layout',
              children: [
                {
                  id: 'relRating',
                  componentType: 'sub-table'
                }
              ],
              layoutType: 'vertical-box'
            }
          ],
          layoutType: 'vertical-box'
        }
      ],
      layoutType: 'horizontal-box'
    }
  ]
}
