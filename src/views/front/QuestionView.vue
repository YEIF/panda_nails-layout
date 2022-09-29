<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner title="常見問題" />
  <div class="background-secondary">
      <div class="container">
    <div class="accordion pt-5 pb-3  col-md-9 mx-auto" id="accordionFlushExample">
      <div
        class="accordion-item mb-5"
        data-aos="fade-up"
        data-aos-offset="100"
        v-for="(item, index) in question"
        :key="index"
      >
        <h2 class="accordion-header" :id="`flush-heading${index}`">
          <button
            class="accordion-button collapsed"
            aria-expanded="false"
            type="button"
            :ref="`accordionButton${index}`"
            @click="toggleAccordionCollapse(index)"
          >
            Q{{ `${index}` }}:{{ item.title }}
          </button>
        </h2>
        <div
          class="accordion-collapse collapse"
          :aria-labelledby="`flush-heading${index}`"
          aria-expanded="false"
          :ref="`accordionCollapse${index}`"
        >
          <!-- data-bs-parent="#accordionFlushExample" -->
          <div class="accordion-body col-md-8 mx-auto text-start text-indent">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import Collapse from 'bootstrap/js/dist/collapse'
export default {
  components: { HeaderBanner, LoadingComponent },
  data () {
    return {
      isLoading: false,
      accordionButtonElementList: [],
      accordionCollapseElementList: [],
      accordionCollapseList: [],
      question: [
        {
          title: '做美甲後，還可以用指甲做事情嗎?',
          content:
            '盡量避免用指甲做事，練習用指腹做事，以免包覆指尖的凝膠磨損造成玻璃，特別是慣用指頭(食指、中指、無名指)'
        },
        {
          title: '做美甲後，可以泡溫泉嗎?',
          content:
            '可以的，但避免過度將手指泡在過熱的水、油份，例如:泡澡、泡溫泉、潛水等活動，會使得維持度降低。'
        },
        {
          title: '洗完澡後，有什麼需要特別注意的?',
          content:
            '洗澡後，因凝膠包覆下的本甲變軟的關係，若是大力撞擊到，較易折損，可以等本甲恢復硬度在做事'
        },
        {
          title: '凝膠會染色嗎?',
          content:
            '深色布料、菸、報紙油墨、水果(橘子、柚子、芒果....等)，皆可能使凝膠表面染色，尤其淺色系。'
        },
        {
          title: '美甲的維持時間有多久?',
          content:
            '凝膠指甲正常可以維持2-6周，但是常碰酒精、常用指尖做事(打字)者，維持度一定會比一般健康甲還要短。'
        }
      ]
    }
  },
  methods: {
    toggleAccordionCollapse (index) {
      this.accordionCollapseList[index].toggle()
      if (
        this.accordionButtonElementList[index]
          .getAttribute('class')
          .split(' ')
          .pop() === 'collapsed'
      ) {
        this.accordionButtonElementList[index].classList.remove('collapsed')
      } else {
        this.accordionButtonElementList[index].classList.add('collapsed')
      }
    }
  },
  mounted () {
    Object.entries(this.$refs).forEach((key, value) => {
      if (key[0].includes('accordionButton')) {
        this.accordionButtonElementList.push(key[1][0])
      } else if (key[0].includes('accordionCollapse')) {
        this.accordionCollapseElementList.push(key[1][0])
      }
    })
    this.accordionCollapseList = this.accordionCollapseElementList.map((item) => {
      return new Collapse(item, { toggle: false })
    })
  }
}
</script>
