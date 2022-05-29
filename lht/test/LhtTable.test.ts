import { shallowMount, mount } from "@vue/test-utils";
import { expect, test, describe, vi } from "vitest";
import LhtTable from "../src/components/LhtTable";
import LhtHead from "../src/components/Head";
import LhtBody from "../src/components/Body";
import LhtFoot from "../src/components/Foot";

describe('LhtTable', () => {
    const dataList= [
      {
        name: "tom",
        age: 21,
        sex: 'man',
        phone: '16621331'
      },
      {
        name: "liy",
        age: 18,
        sex: 'woman',
        phone: '13621723291'
      },
      {
        name: "tim",
        age: 19,
        sex: 'man'
      },
      {
        name: "mike",
        age: 23,
        sex: 'man',
        phone: '1291011'
      },
      {
        name: "matix",
        age: 20,
        sex: 'man'
      },
      {
        name: "kety",
        age: 25,
        sex: 'woman'
      },
      {
        name: "sandy",
        age: 22,
        sex: 'woman'
      },
      {
        name: "love",
        age: 24,
        sex: 'man',
        ser: 'lwq'
      }
    ]; 
    const columns= [
      {
        title: "姓名",
        value: "name",
      },
      {
        title: "年龄",
        value: "age",
        sortable: {}
      },
      {
        title: "性别",
        value: "sex",
      },
      {
        value: "phone",
      }
    ]


  const defaultWrapper = mount(LhtTable, {
    props: {
      dataList,
      columns
    }
  })

  test('should render table and pagination', () => {
    expect(defaultWrapper.findComponent(LhtHead).exists()).toBe(true);
    expect(defaultWrapper.findComponent(LhtBody).exists()).toBe(true);
    expect(defaultWrapper.findComponent(LhtFoot).exists()).toBe(true);
    expect(defaultWrapper.find('.pagination').exists()).toBe(true);
  });

  test('when change pagination of table, should updateParams', async () => {
    const pagination = defaultWrapper.findComponent(LhtFoot);
    const nextBtn = pagination.find("button.next")

    await nextBtn.trigger("click");
    expect(pagination.emitted().changePage).toBeTruthy();
    expect(pagination.find("span.nowPage").text()).toBe("2");

    const ageOption = pagination.find('select').findAll('option').at(1)
    await ageOption.setSelected()

    expect(pagination.emitted().changeSize).toBeTruthy();
  });

  test('sort', async () => {
    const head = defaultWrapper.findComponent(LhtHead);
    const body = defaultWrapper.findComponent(LhtBody);

    await head.find("th#age"). find('span').trigger('click');
    expect(head.emitted().changeSort).toBeTruthy();
    expect(body.props().sortOptions).toEqual({ dataIndex: 'age', sortBy: 'ascend' });
  });
})