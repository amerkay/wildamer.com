<script setup lang="ts">
import { computed, ref } from 'vue'
import HelpTooltip from '~/components/base/HelpTooltip.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Slider } from '~/components/ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'

// Donation amounts and their percentage distribution (from real data)
const DONATION_DISTRIBUTION = [
  { amount: 3, percentage: 0.158 }, // £3: 15.80%
  { amount: 5, percentage: 0.427 }, // £5: 42.70%
  { amount: 10, percentage: 0.364 }, // £10: 36.40%
  { amount: 20, percentage: 0.0318 }, // £20: 3.18%
  { amount: 50, percentage: 0.0063 }, // £50: 0.63%
  { amount: 100, percentage: 0.0026 }, // £100: 0.26%
  { amount: 200, percentage: 0.0016 }, // £200: 0.16%
  { amount: 500, percentage: 0.0002 }, // £500: 0.02%
  { amount: 1000, percentage: 0.0002 } // £1000: 0.02%
]

interface Platform {
  name: string
  feeRate: (amount: number) => number
  includesStripe: boolean
  description: string
  feeCap?: number
  passesCoveredFeesOverPercent?: number
}

const PLATFORMS: Platform[] = [
  {
    name: 'Crowdfunder',
    feeRate: () => 0.2,
    includesStripe: false,
    description: '20% covered fees + 1.9% + 20p per pledge'
  },
  {
    name: 'GoFundMe',
    feeRate: () => 0.165,
    includesStripe: false,
    description: '16.5% covered fees + charity pays 2.9% + 25p'
  },
  {
    name: 'JustGiving',
    feeRate: (amt) => (amt <= 3 ? 0.333 : amt <= 5 ? 0.2 : 0.17),
    includesStripe: false,
    description: '33.3% to 17% + 5% Gift Aid fee'
  },
  {
    name: 'whydonate',
    feeRate: (amt) => {
      if (amt <= 250) return 0.14
      if (amt <= 500) return 0.11
      return 0.09
    },
    includesStripe: false,
    description: '14% to 9%'
  },
  {
    name: 'givey.com',
    feeRate: () => 0.05,
    includesStripe: true,
    description: '5% (includes Stripe fees)'
  },
  {
    name: 'FundraiserUp',
    feeRate: (amt) => {
      if (amt <= 3) return 0.167
      if (amt <= 5) return 0.12
      if (amt <= 10) return 0.1
      if (amt <= 20) return 0.085
      if (amt <= 30) return 0.075
      return 0.07
    },
    includesStripe: false,
    description: '16.7% to 7% (charity pays 4% if uncovered)',
    passesCoveredFeesOverPercent: 0.04
  },
  {
    name: 'Funraisin',
    feeRate: (amt) => {
      if (amt <= 3) return 0.343
      if (amt <= 5) return 0.222
      if (amt <= 10) return 0.133
      if (amt <= 20) return 0.092
      if (amt <= 50) return 0.066
      if (amt <= 100) return 0.06
      if (amt <= 200) return 0.06
      if (amt <= 500) return 0.04
      return 0.02
    },
    includesStripe: false,
    description: '34.3% to 2% (£20 cap) + 4.75% Gift Aid fee',
    feeCap: 20
  },
  {
    name: 'Donorbox',
    feeRate: (amt) => {
      if (amt <= 3) return 0.113
      if (amt <= 5) return 0.092
      if (amt <= 10) return 0.068
      if (amt <= 20) return 0.056
      if (amt <= 50) return 0.049
      if (amt <= 100) return 0.046
      if (amt <= 200) return 0.045
      return 0.044
    },
    includesStripe: false,
    description: '9.2% to 4.4%',
    passesCoveredFeesOverPercent: 0.0295
  },
  {
    name: 'Raisely',
    feeRate: (amt) => {
      if (amt <= 3) return 0.347
      if (amt <= 5) return 0.226
      if (amt <= 10) return 0.135
      if (amt <= 20) return 0.09
      if (amt <= 50) return 0.063
      if (amt <= 100) return 0.05
      if (amt <= 200) return 0.0475
      if (amt <= 500) return 0.046
      return 0.0455
    },
    includesStripe: false,
    description: '34.7% to 4.5%'
  },
  {
    name: 'Enthuse',
    feeRate: (amt) => {
      if (amt <= 3) return 0.17
      if (amt <= 5) return 0.13
      if (amt <= 10) return 0.099
      if (amt <= 20) return 0.084
      if (amt <= 50) return 0.075
      if (amt <= 100) return 0.072
      if (amt <= 200) return 0.0705
      return 0.0693
    },
    includesStripe: false,
    description: '17% to 6.9% + £40/mo + 5% Gift Aid fee'
  }
]

// Slider configuration
const SLIDER_VALUES = [1000, 5000, 10000, 25000, 50000, 100000]
const sliderIndex = ref([2]) // Default £10k
const fundraisingGoal = computed(() => SLIDER_VALUES[sliderIndex.value[0] ?? 2])

// Donor contribution rate configuration
const donorContributionRate = ref('0.175') // Default 17.5%

// Calculate donation distribution to match goal
function calculateDonationCounts(targetAmount: number): Array<{ amount: number; count: number }> {
  const distribution = DONATION_DISTRIBUTION.map((d) => ({
    amount: d.amount,
    count: Math.round((targetAmount * d.percentage) / d.amount)
  })).filter((d) => d.count > 0)

  // Adjust to hit target more precisely
  const currentTotal = distribution.reduce((sum, d) => sum + d.amount * d.count, 0)
  const diff = targetAmount - currentTotal

  if (Math.abs(diff) > 0.01) {
    // Find best bucket to adjust
    const sortedByAmount = [...distribution].sort((a, b) => a.amount - b.amount)

    if (diff > 0) {
      // Need to add - use smallest amounts
      for (const item of sortedByAmount) {
        const neededCount = Math.floor(diff / item.amount)
        if (neededCount > 0) {
          item.count += neededCount
          break
        }
      }
    } else {
      // Need to remove - use largest amounts
      for (const item of sortedByAmount.reverse()) {
        const excessCount = Math.min(item.count, Math.floor(Math.abs(diff) / item.amount))
        if (excessCount > 0) {
          item.count -= excessCount
          break
        }
      }
    }
  }

  return distribution.filter((d) => d.count > 0)
}

// Calculate platform costs
function calculatePlatformCost(platform: Platform, goal: number) {
  const donations = calculateDonationCounts(goal)

  let platformFees = 0
  let stripeFees = 0
  let totalRaised = 0
  let passedBackFees = 0

  const breakdown = donations.map(({ amount, count }) => {
    const donationTotal = amount * count
    totalRaised += donationTotal

    let platformFeeRate = platform.feeRate(amount)
    let platformFeePerDonation = amount * platformFeeRate

    // Apply fee cap if specified
    if (platform.feeCap !== undefined) {
      platformFeePerDonation = Math.min(platformFeePerDonation, platform.feeCap)
      platformFeeRate = platformFeePerDonation / amount
    }

    const platformFeeBucket = platformFeePerDonation * count

    // Stripe fees apply to total payment (base + platform fee)
    const totalPayment = amount + platformFeePerDonation
    const stripeFeePerDonation = platform.includesStripe ? 0 : totalPayment * 0.015 + 0.2
    const stripeFeeBucket = stripeFeePerDonation * count

    // Handle platforms that pass back covered fees above a threshold
    // The threshold is calculated on the total payment (base + tip)
    let passedBackPerDonation = 0
    if (platform.passesCoveredFeesOverPercent !== undefined) {
      const thresholdFee = totalPayment * platform.passesCoveredFeesOverPercent
      if (platformFeePerDonation > thresholdFee) {
        passedBackPerDonation = platformFeePerDonation - thresholdFee
        passedBackFees += passedBackPerDonation * count
      }
    }

    platformFees += platformFeeBucket
    stripeFees += stripeFeeBucket

    return {
      amount,
      count,
      platformFeeRate: platformFeeRate * 100,
      platformFeeAmount: platformFeePerDonation,
      stripeFeeAmount: stripeFeePerDonation,
      platformFeeBucket: platformFeeBucket,
      stripeFeesBucket: stripeFeeBucket,
      passedBackPerDonation,
      passedBackBucket: passedBackPerDonation * count,
      totalFees: (platformFeePerDonation + stripeFeePerDonation) * count
    }
  })

  const totalDonorPayment = totalRaised + platformFees
  const charityReceives = totalDonorPayment - platformFees - stripeFees + passedBackFees

  return {
    platform: platform.name,
    description: platform.description,
    includesStripe: platform.includesStripe,
    totalRaised,
    platformFees,
    stripeFees,
    passedBackFees,
    totalFees: platformFees + stripeFees,
    totalDonorPayment,
    charityReceives,
    breakdown,
    totalDonations: donations.reduce((sum, d) => sum + d.count, 0)
  }
}

// Calculate baseline (own form with dynamic donor contribution)
const baseline = computed(() => {
  const goal = fundraisingGoal.value ?? 10000
  const donations = calculateDonationCounts(goal)
  const contributionRate = parseFloat(donorContributionRate.value)

  let donorContributions = 0
  let stripeFees = 0
  let totalRaised = 0

  const breakdown = donations.map(({ amount, count }) => {
    const donationTotal = amount * count
    totalRaised += donationTotal

    const donorFee = amount * contributionRate
    const totalPayment = amount + donorFee

    const donorContributionBucket = donorFee * count
    const stripeFeePerDonation = totalPayment * 0.015 + 0.2
    const stripeFeeBucket = stripeFeePerDonation * count

    donorContributions += donorContributionBucket
    stripeFees += stripeFeeBucket

    return {
      amount,
      count,
      contributionRate: contributionRate * 100,
      donorContributionBucket,
      stripeFeeBucket
    }
  })

  const netGain = donorContributions - stripeFees
  const charityReceives = totalRaised + netGain

  return {
    goal,
    totalRaised,
    donorContributions,
    stripeFees,
    netGain,
    charityReceives,
    totalDonorPayment: totalRaised + donorContributions,
    totalDonations: donations.reduce((sum, d) => sum + d.count, 0),
    contributionRate,
    breakdown
  }
})

// Calculate all platforms
const platformResults = computed(() => {
  const goal = fundraisingGoal.value ?? 10000
  return PLATFORMS.map((p) => calculatePlatformCost(p, goal)).sort(
    (a, b) => b.charityReceives - a.charityReceives
  )
})

const worstPlatform = computed(() =>
  platformResults.value.reduce((worst, p) => (p.totalFees > worst.totalFees ? p : worst))
)
const incomeIncrease = computed(() => {
  const baselineReceives = baseline.value.charityReceives
  const worstReceives = worstPlatform.value?.charityReceives ?? 0
  return baselineReceives - worstReceives
})

// Formatting helpers
const fmt = (n: number | undefined) => {
  if (n === undefined) return '£0.00'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n)
}

const fmtShort = (n: number) => (n >= 1000 ? `£${n / 1000}k` : fmt(n))

const formatNumber = (n: number) => {
  return new Intl.NumberFormat('en-GB').format(n)
}

const getTooltipText = (totalDonations: number) => {
  return `This simulates real-world costs of ${formatNumber(totalDonations)} donations distributed based on 14k real payments received by charities I worked with. Green mean your charity receives this uplift, red means the platform takes it.`
}
</script>

<template>
  <div
    class="not-prose w-full space-y-6 border-2 border-border px-4 py-6 sm:px-6 rounded-lg max-w-4xl mx-auto"
  >
    <!-- Header -->
    <div class="space-y-2">
      <h2 class="text-3xl font-bold text-foreground">UK Fundraising Platform Fee Calculator</h2>
      <p class="text-muted-foreground">
        Compare "donor cover fees" lost revenue. Most platforms also charge monthly subscription
        fees, and some charge you ~5% of your Gift Aid's 25% on top of the covered fees below.
      </p>
    </div>

    <!-- Slider -->
    <div class="bg-card rounded-lg p-6 shadow-sm border">
      <div class="space-y-4">
        <div class="flex justify-between items-baseline">
          <span class="font-medium text-muted-foreground">Fundraising Goal</span>
          <span class="text-2xl font-bold">{{ fmt(fundraisingGoal) }}</span>
        </div>

        <Slider
          v-model="sliderIndex"
          :min="0"
          :max="SLIDER_VALUES.length - 1"
          :step="1"
          class="pt-2 mb-3"
        />

        <div
          class="flex justify-between text-center text-sm font-bold text-muted-foreground w-full"
        >
          <span>{{ fmtShort(SLIDER_VALUES[0] ?? 1000) }}</span>
          <span>{{ fmtShort(SLIDER_VALUES[SLIDER_VALUES.length - 1] ?? 100000) }}</span>
        </div>
      </div>

      <!-- Donor Contribution Rate Selector -->
      <div class="space-y-3 pt-4 mt-6 border-t border-border">
        <p class="text-sm font-medium text-muted-foreground">
          Ask donors to contribute towards fundraising costs (applies to your own form only)
        </p>

        <div class="sm:max-w-xs">
          <Select v-model="donorContributionRate">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select contribution rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.05"> 5% </SelectItem>
              <SelectItem value="0.075"> 7.5% </SelectItem>
              <SelectItem value="0.10"> 10% </SelectItem>
              <SelectItem value="0.125"> 12.5% </SelectItem>
              <SelectItem value="0.15"> 15% </SelectItem>
              <SelectItem value="0.175"> 17.5% </SelectItem>
              <SelectItem value="0.20"> 20% </SelectItem>
              <SelectItem value="0.25"> 25% </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <!-- Key Insights -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div class="bg-card rounded-lg p-4 border text-center">
        <HelpTooltip
          content="The platform fee (excluding Stripe) charged by the most expensive platform for your fundraising goal."
        >
          <div class="text-2xl font-bold text-destructive">
            {{ fmt(worstPlatform?.platformFees) }}
          </div>
          <Icon name="lucide:circle-question-mark" size="15" />
        </HelpTooltip>

        <div class="text-sm text-muted-foreground mt-1">Worst: {{ worstPlatform?.platform }}</div>
      </div>

      <div class="bg-card rounded-lg p-4 border text-center">
        <HelpTooltip
          content="Donor contributions collected minus Stripe fees paid. This is the net amount your charity gains by using your own form."
        >
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
            +{{ fmt(Math.abs(baseline.netGain)) }}
          </div>
          <Icon name="lucide:circle-question-mark" size="15" />
        </HelpTooltip>

        <div class="text-sm text-muted-foreground mt-1">You gain with own form</div>
      </div>

      <div class="bg-card rounded-lg p-4 border text-center col-span-2 md:col-span-1">
        <HelpTooltip
          content="The difference between what you'd receive with your own form versus the worst platform. This is how much more your charity could receive."
        >
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ fmt(incomeIncrease) }}
          </div>
          <Icon name="lucide:circle-question-mark" size="15" />
        </HelpTooltip>

        <div class="text-sm text-muted-foreground mt-1">Potential income increase</div>
      </div>
    </div>

    <!-- Comparison Table -->
    <div class="bg-card rounded-lg border shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent">
            <TableHead class="min-w-[250px]">Platform</TableHead>
            <TableHead class="text-right">
              <HelpTooltip
                content="Total amount donors pay, including the base donation plus any platform fees or donor contributions."
              >
                <span>Donors Pay</span>
                <Icon name="lucide:circle-question-mark" size="14" />
              </HelpTooltip>
            </TableHead>
            <TableHead class="text-right">
              <HelpTooltip
                content="Fees charged by the fundraising platform. For 'Your Own Form', this shows donor contributions collected. For other platforms, this is deducted from what the charity receives."
              >
                <span>Covered Fees</span>
                <Icon name="lucide:circle-question-mark" size="14" />
              </HelpTooltip>
            </TableHead>
            <TableHead class="text-right">
              <HelpTooltip
                content="Payment processing fees charged by Stripe (1.5% + £0.20 per transaction). Some platforms include this in their platform fee. Calculated on the total payment amount (donation + platform fees)."
              >
                <span>Stripe Fees</span>
                <Icon name="lucide:circle-question-mark" size="14" />
              </HelpTooltip>
            </TableHead>
            <TableHead class="text-right font-semibold">
              <HelpTooltip
                content="The final amount your charity receives after all fees are deducted. For 'Your Own Form': donations + donor contributions - Stripe fees. For platforms: total donor payment - platform fees - Stripe fees."
              >
                <span>Charity Gets</span>
                <Icon name="lucide:circle-question-mark" size="14" />
              </HelpTooltip>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <!-- Baseline: Own Form -->
          <TableRow
            class="bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30"
          >
            <TableCell class="font-medium">
              <Accordion type="single" collapsible class="w-full">
                <AccordionItem value="breakdown" class="border-none">
                  <AccordionTrigger class="hover:no-underline p-0 font-sans">
                    <div class="flex items-center gap-2">
                      <div class="text-left">
                        <div class="font-bold text-foreground">Your Own Form</div>
                        <div class="text-xs text-muted-foreground">
                          {{ (baseline.contributionRate * 100).toFixed(1) }}% donor contribution
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div class="mt-3 space-y-2 text-xs">
                      <div class="mb-3">
                        <HelpTooltip :content="getTooltipText(baseline.totalDonations)">
                          <span class="font-semibold text-muted-foreground"
                            >Breakdown by donation amount:
                          </span>
                          <Icon name="lucide:circle-question-mark" size="15" />
                        </HelpTooltip>
                      </div>
                      <div
                        v-for="item in baseline.breakdown"
                        :key="item.amount"
                        class="flex justify-between items-center py-1 border-t border-border/50 first:border-t-0"
                      >
                        <span class="text-muted-foreground">
                          {{ item.count }} × £{{ item.amount }}
                        </span>
                        <span class="font-mono text-right text-emerald-600 dark:text-emerald-400">
                          {{ item.contributionRate.toFixed(1) }}% = +{{
                            fmt(item.donorContributionBucket)
                          }}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
            <TableCell class="text-right font-medium">
              {{ fmt(baseline.totalDonorPayment) }}
            </TableCell>
            <TableCell class="text-right text-emerald-600 dark:text-emerald-400">
              +{{ fmt(baseline.donorContributions) }}
            </TableCell>
            <TableCell class="text-right text-muted-foreground">
              −{{ fmt(baseline.stripeFees) }}
            </TableCell>
            <TableCell class="text-right font-bold text-emerald-600 dark:text-emerald-400">
              {{ fmt(baseline.charityReceives) }}
            </TableCell>
          </TableRow>

          <!-- Platforms -->
          <template v-for="result in platformResults" :key="result.platform">
            <TableRow class="hover:bg-muted/50">
              <TableCell class="font-medium">
                <Accordion type="single" collapsible class="w-full">
                  <AccordionItem value="breakdown" class="border-none">
                    <AccordionTrigger class="hover:no-underline p-0">
                      <div class="text-left font-sans">
                        <div class="text-foreground">{{ result.platform }}</div>
                        <div class="text-xs text-muted-foreground">{{ result.description }}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div class="mt-3 space-y-2 text-xs">
                        <div class="mb-3">
                          <HelpTooltip :content="getTooltipText(baseline.totalDonations)">
                            <span class="font-semibold text-muted-foreground">
                              Breakdown by donation amount:
                            </span>
                            <Icon name="lucide:circle-question-mark" size="15" />
                          </HelpTooltip>
                        </div>
                        <div
                          v-for="item in result.breakdown"
                          :key="item.amount"
                          class="flex justify-between items-center py-1 border-t border-border/50 first:border-t-0"
                        >
                          <span class="text-muted-foreground">
                            {{ item.count }} × £{{ item.amount }}
                          </span>
                          <span class="font-mono text-right text-destructive">
                            {{ item.platformFeeRate.toFixed(1) }}% = −{{
                              fmt(item.platformFeeBucket)
                            }}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
              <TableCell class="text-right">
                {{ fmt(result.totalDonorPayment) }}
              </TableCell>
              <TableCell class="text-right text-destructive">
                −{{ fmt(result.platformFees) }}
              </TableCell>
              <TableCell class="text-right text-muted-foreground">
                <span v-if="!result.includesStripe"> −{{ fmt(result.stripeFees) }} </span>
                <span v-else class="text-xs italic"> included </span>
              </TableCell>
              <TableCell class="text-right font-semibold">
                {{ fmt(result.charityReceives) }}
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Methodology -->
    <div class="text-xs text-muted-foreground">
      <p>
        Calculations based on 14k real donations. Platform fees obtained from "donor cover fees"
        live forms. Stripe fees used 1.5% + £0.20.
      </p>
    </div>
  </div>
</template>

<style scoped>
* {
  transition-property: width, height, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
