console.log('app-spec.js')

//

import Vue from 'vue'
import App from '../../src/App.vue'

import store from '../../src/store'

//

describe("A suite is just a function", function () {
  var a;

  it("and so is a spec", function () {
    a = true;

    expect(a).toBe(true);
  });
});

describe('app', () => {
  var app

  beforeEach(() => {
    const Constructor = Vue.extend(App)
    app = new Constructor({ store }).$mount()

    app.$store.commit('search', { query: '', results: [] })
  })

  afterEach(() => {
    app = null
  })

  //

  it('correctly sets the message when created', () => {
    expect(app.msg).toBe('Welcome to Your Vue.js App')
  })

  it('store loading is false', () => {
    expect(app.$store.getters.loading).toBe(false)
  })

  it (
    'correct show results for search query',
    (done) => {
      /*
      Object.getOwnPropertyNames(app.$children[0]).forEach(
        (val, idx, array) => {
          console.log(val)
        }
      )

      console.log(app.$children[0].$el)
      */

      app.$children[0].formSubmit({ target: { query: { value: 'Earth' } } })
        .finally(
          () => {
            Vue.nextTick(
              () => {
                var list = app.$el.querySelectorAll('section ol li')

                //for (let item of list) {
                //  console.log(item.textContent)
                //}

                expect(app.$store.getters['search-results'].length).toBeGreaterThan(0)
                expect(list.length).toBe(app.$store.getters['search-results'].length)

                done()
              }
            )
          }
        )

    },
    6000
  )

})

describe('app-query form', function () {
  const QUERY = 'Flat Earth'

  var app, form

  beforeEach(() => {
    const Constructor = Vue.extend(App)
    app = new Constructor({ store }).$mount()

    app.$store.commit('search', { query: '', results: [] })

    form = app.$el.querySelector('nav form')
    form.elements.query.value = QUERY
  })

  afterEach(() => {
    app = null
    form = null
  })

  it ('submit call query', () => {
    spyOn(app.$children[0], 'formSubmit')

    const submitEvent = new window.Event('submit')
    form.dispatchEvent(submitEvent)

    app._watcher.run()

    expect(app.$children[0].formSubmit).toHaveBeenCalled()
  })

  it (
    'submit correct display query in header',
    (done) => {
      const submitEvent = new window.Event('submit')
      form.dispatchEvent(submitEvent)

      app._watcher.run()

      setTimeout(() => {
        var h = app.$el.querySelector('section h3')

        expect(h.textContent).toMatch(new RegExp(QUERY))

        done()
      }, 2000)
    },
    6000
  )

  it (
    'submit correct display results',
    (done) => {
      const submitEvent = new window.Event('submit')
      form.dispatchEvent(submitEvent)

      app._watcher.run()

      setTimeout(() => {
        //console.log(app.$store.getters.query)
        //console.log(app.$store.getters['search-results'].length)

        var list = app.$el.querySelectorAll('section ol li')
        /*
        for (var item of list) {
          console.log(item.textContent)
        }
        */
        expect(app.$store.getters['search-results'].length).toBeGreaterThan(0)
        expect(list.length).toEqual(app.$store.getters['search-results'].length)

        done()
      }, 2000)

    },
    6000
  )

})
