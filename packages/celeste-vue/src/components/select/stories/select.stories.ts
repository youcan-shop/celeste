import type { Meta, StoryObj } from '@storybook/vue3';
import SelectContent from '../select-content.vue';
import SelectGroup from '../select-group.vue';
import SelectIcon from '../select-icon.vue';
import SelectItem from '../select-item.vue';
import SelectLabel from '../select-label.vue';
import SelectSeparator from '../select-separator.vue';
import SelectTrigger from '../select-trigger.vue';
import SelectValue from '../select-value.vue';
import Select from '../select.vue';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {

  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;">
          <SelectValue placeholder="Select your favorite fruit.." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    defaultValue: 'utility',
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;">
          <SelectValue placeholder="Select your favorite fruit.." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="utility">
            <SelectIcon>
              <i class="i-celeste-flashlight-line" />
            </SelectIcon>
            Utility Payment
          </SelectItem>
          <SelectItem value="rent">
            <SelectIcon>
              <i class="i-celeste-home-4-line" />
            </SelectIcon>
            Rent Payment
          </SelectItem>
          <SelectItem value="donation">
            <SelectIcon>
              <i class="i-celeste-hand-coin-line" />
            </SelectIcon>
            Donation
          </SelectItem>
          <SelectItem value="tax">
            <SelectIcon>
              <i class="i-celeste-file-list-2-line" />
            </SelectIcon>
            Tax payment
          </SelectItem>
          <SelectItem value="tuition">
            <SelectIcon>
              <i class="i-celeste-building-line" />
            </SelectIcon>
            Tuition Fee
          </SelectItem>
          <SelectItem value="phone">
            <SelectIcon>
              <i class="i-celeste-smartphone-line" />
            </SelectIcon>
            Phone Bill
          </SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};

export const Size: Story = {
  args: {
    defaultValue: 'apple',
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 1em;">
        <Select v-bind="args">
          <SelectTrigger style="width: 300px;" size="md">
            <SelectValue placeholder="Select your favorite fruit.." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectContent>
        </Select>
        <Select v-bind="args">
          <SelectTrigger style="width: 300px;" size="sm">
            <SelectValue placeholder="Select your favorite fruit..">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectContent>
        </Select>
        <Select v-bind="args">
          <SelectTrigger style="width: 300px;" size="xs">
            <SelectValue placeholder="Select your favorite fruit..">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
};

export const Country: Story = {
  args: {
    disabled: true,
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;">
          <SelectIcon>
            <i class="i-celeste-global-line" />
          </SelectIcon>
          <SelectValue placeholder="Select a country.." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="usa">
            <SelectIcon>
              <img 
                style="object-fit: cover; clip-path: circle()" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1024px-Flag_of_the_United_States.png" alt="USA" />
            </SelectIcon>
            United States
          </SelectItem>
          <SelectItem value="germany">
            <SelectIcon>
              <img 
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="Germany" />
            </SelectIcon>
            Germany
          </SelectItem>
          <SelectItem value="france">
            <SelectIcon>
              <img
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png" alt="France" />
            </SelectIcon>
            France
          </SelectItem>
          <SelectItem value="denmark">
            <SelectIcon>
              <img
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/1280px-Flag_of_Denmark.svg.png" alt="Denmark" />
            </SelectIcon>
            Denmark
          </SelectItem>
          <SelectItem value="finland">
            <SelectIcon>
              <img
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1800px-Flag_of_Finland.svg.png" alt="Finland" />
            </SelectIcon>
            Finland
          </SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    defaultValue: 'apple',
    disabled: true,
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 1em;">
        <Select v-bind="args">
          <SelectTrigger style="width: 300px;">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
        <Select v-bind="args">
          <SelectTrigger style="width: 300px;">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">
              <SelectIcon>
                <i class="i-celeste-apple-line" />
              </SelectIcon>
              Apple
            </SelectItem>
          </SelectContent>
        </Select>
        <Select v-bind="args">
          <SelectTrigger style="width: 300px;">
            <SelectValue placeholder="Select your favorite fruit..">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">
              <SelectIcon>
                <img src="https://static.vecteezy.com/system/resources/previews/023/271/623/non_2x/3d-red-apple-with-green-leaf-free-png.png" alt="Apple" />
              </SelectIcon>
              Apple
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
};

export const Compact: Story = {
  args: {
    defaultValue: '5',
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger variant="compact">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="center">
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};

export const Inline: Story = {
  args: {
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger variant="inline">
          <SelectIcon>
            <i class="i-celeste-global-line" />
          </SelectIcon>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent align="center" width="fit">
          <SelectItem value="usa">
            <SelectIcon>
              <img
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1024px-Flag_of_the_United_States.png" alt="USA" />
            </SelectIcon>
            US
          </SelectItem>
          <SelectItem value="germany">
            <SelectIcon>
              <img 
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="Germany" />
            </SelectIcon>
            DE
          </SelectItem>
          <SelectItem value="france" disabled>
            <SelectIcon>
              <img 
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png" alt="France" />
            </SelectIcon>
            FR
          </SelectItem>
          <SelectItem value="denmark">
            <SelectIcon>
              <img 
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/1280px-Flag_of_Denmark.svg.png" alt="Denmark" />
            </SelectIcon>
            DK
          </SelectItem>
          <SelectItem value="finland">
            <SelectIcon>
              <img 
                style="object-fit: cover; clip-path: circle()"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1800px-Flag_of_Finland.svg.png" alt="Finland" />
            </SelectIcon>
            FI
          </SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};

export const Group: Story = {
  args: {
  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;">
          <SelectValue placeholder="Select a fruit.." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="aubergine">Aubergine</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="courgette" disabled>Courgette</SelectItem>
            <SelectItem value="leek">Leek</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    `,
  }),
};

export const HasError: Story = {
  args: {

  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;" has-error>
          <SelectValue placeholder="Select your favorite fruit..">
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};
