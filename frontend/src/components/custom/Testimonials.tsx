import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Hexagon, Heart, Star, ArrowUpRight } from "lucide-react"

type MetricTestimonial = {
  metric: string
  metricSuffix?: string
  accent: "orange" | "red" | "blue"
  headline: string
  quote: string
  name: string
  role: string
  initials: string
}

const METRIC_TESTIMONIALS: MetricTestimonial[] = [
  {
    metric: "98",
    metricSuffix: "%",
    accent: "orange",
    headline:
      "Reduction in manual wallet operations during testing.",
    quote:
      "We replaced our entire QA pipeline with J.A.R.V.I.S automation. Mnemonics, keys, balances, transactions — everything is now handled autonomously with near-zero human involvement.",
    name: "Elena Rodriguez",
    role: "Lead Protocol Eng, Uniswap",
    initials: "ER",
  },
  {
    metric: "3.2",
    metricSuffix: "x",
    accent: "red",
    headline: "Faster contract interaction & query execution.",
    quote:
      "Fetching contract data used to take multiple tools and scripts. J.A.R.V.I.S now parses, retrieves, and validates everything in one flow — it completely streamlined our dev environment.",
    name: "Sarah Jenkins",
    role: "PM, Optimism",
    initials: "SJ",
  },
  {
    metric: "0.4",
    metricSuffix: "s",
    accent: "blue",
    headline:
      "Average time to generate & validate a full transaction.",
    quote:
      "The agent-based workflow is game-changing. Our dApp can now build, sign, and broadcast transactions without touching the CLI. It's faster than any in-house scripts we've ever built.",
    name: "James Wu",
    role: "Core Dev, Arbitrum",
    initials: "JW",
  },
]

const accentMap: Record<
  MetricTestimonial["accent"],
  { bar: string; metric: string }
> = {
  orange: {
    bar: "bg-orange-500",
    metric: "text-orange-500",
  },
  red: {
    bar: "bg-red-500",
    metric: "text-red-400",
  },
  blue: {
    bar: "bg-sky-500",
    metric: "text-sky-400",
  },
}

function MetricTestimonialsCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % METRIC_TESTIMONIALS.length)
    }, 9000)
    return () => clearInterval(id)
  }, [])

  const current = METRIC_TESTIMONIALS[index]
  const accent = accentMap[current.accent]

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.metric + current.name}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.22, 0.8, 0.35, 1] }}
          className="h-full"
        >
          <Card className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 px-8 py-8 sm:px-10 sm:py-10 shadow-[0_26px_80px_rgba(0,0,0,0.85)] h-full flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08)_0,transparent_55%),radial-gradient(circle_at_bottom_right,rgba(24,24,27,0.9)_0,transparent_60%)] opacity-70" />

            <div>
              <div className="relative flex items-start gap-6">
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-6xl font-semibold tracking-tight text-white">
                    {current.metric}
                  </span>
                  {current.metricSuffix && (
                    <span
                      className={`text-4xl font-semibold tracking-tight ${accent.metric}`}
                    >
                      {current.metricSuffix}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative mt-8 flex items-start gap-4">
                <span
                  className={`mt-1 h-10 w-[2px] rounded-full ${accent.bar}`}
                />
                <p className="text-base leading-relaxed text-zinc-100">
                  {current.headline}
                </p>
              </div>

              <p className="relative mt-8 text-sm sm:text-base leading-relaxed text-zinc-300">
                &quot;{current.quote}&quot;
              </p>
            </div>

            <div className="relative border-t border-zinc-800/80 pt-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarFallback className="bg-zinc-800 text-xs font-semibold text-zinc-100">
                    {current.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-100">
                    {current.name}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {current.role}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center ">
        <Badge className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-orange-100">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] text-black">
            <Star />
          </span>
          <span className="uppercase">Testimonials</span>
        </Badge>

        <h2 className=" md:text-7xl text-5xl font-medium text-white tracking-tighter font-manrope mb-6 mt-10 sm:text-5xl lg:text-7xl">
          Proven results,{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
            delivered
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-lg text-zinc-400 leading-relaxed">
          See how leading protocols and dApps are scaling their infrastructure
          with
        </p>
        <p className="mt-1 text-base sm:text-lg text-zinc-400">
          Nebula&apos;s unified layer.
        </p>
      </div>

      <div className="relative max-w-[80vw] flex flex-row p-2 mx-auto gap-3">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-700 to-black" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-zinc-700 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-700 to-black" />
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-t from-zinc-700 to-black" />
        
        <div className=" w-[45vw] flex flex-col gap-6">
          <Card className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 px-8 py-8 sm:px-10 sm:py-10 shadow-[0_24px_80px_rgba(0,0,0,0.75)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08)_0,transparent_50%),radial-gradient(circle_at_bottom_right,rgba(39,39,42,0.8)_0,transparent_55%)] opacity-60" />
            <div className="relative flex items-baseline gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  120
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  x
                </span>
              </div>
              <p className="text-sm sm:text-base text-zinc-200">
                Faster testnet automation for developers.
              </p>
            </div>

            <p className="relative mt-8 text-sm sm:text-base leading-relaxed text-zinc-300">
              &quot;.J.A.R.V.I.S removed 90% of our manual wallet ops. Creating addresses, signing TXs, querying balances — everything is instant now. Our developer velocity skyrocketed.&quot;
            </p>

            <div className="relative mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarFallback className="bg-zinc-800 text-xs font-semibold text-zinc-200">
                    DC
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-100">
                    David Chen
                  </span>
                  <span className="text-xs text-zinc-500">CTO, Chainlink</span>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-900/80">
                <Hexagon className="h-4 w-4 text-zinc-500" />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/80 px-7 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.75)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05)_0,transparent_55%)] opacity-70" />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/90">
                    <Heart className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  &quot;The voice automation blew our minds. Saying ‘send 5 ADA to Treasury’ and watching it craft the full transaction safely — that’s the future of blockchain UX.&quot;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-white/10">
                    <AvatarFallback className="bg-zinc-800 text-[11px] font-semibold text-zinc-100">
                      SK
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-100">
                      Stani Kulechov
                    </span>
                    <span className="text-xs text-zinc-500">
                      Founder, Aave
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-zinc-50 px-7 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(24,24,27,0.05)_0,transparent_55%)]" />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
                    <Star className="h-3.5 w-3.5 text-zinc-500" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-zinc-800">
                  &quot;Their architecture around DID-secured payments is the cleanest implementation I’ve seen. The agent handles identity, signing, and orchestration with zero friction.&quot;
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-zinc-200">
                      <AvatarFallback className="bg-zinc-900 text-[11px] font-semibold text-zinc-100">
                        JG
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">
                        Jeanne Grey
                      </span>
                      <span className="text-xs text-zinc-500">
                        Director, Polkadot
                      </span>
                    </div>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50">
                    <div className="h-3.5 w-3.5 rounded-full border border-dashed border-zinc-400" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="w-[35vw] flex flex-col">
          <MetricTestimonialsCarousel />
        </div>
      </div>
      <div className="max-w-[80vw] mx-auto mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarFallback className="bg-zinc-900 text-[11px] font-semibold text-zinc-100">
                A1
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarFallback className="bg-zinc-900 text-[11px] font-semibold text-zinc-100">
                A2
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarFallback className="bg-zinc-900 text-[11px] font-semibold text-zinc-100">
                A3
              </AvatarFallback>
            </Avatar>
            <div className="h-9 w-9 rounded-full border border-white/10 bg-zinc-900/80 flex items-center justify-center text-xs font-semibold text-zinc-100">
              4.9/5
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            from 10+ users
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full h-12 border border-zinc-700 bg-zinc-900/80 px-5 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50 flex items-center gap-2"
        >
          <span>Read all success stories</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-50 text-zinc-900">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
    </section>
  )
}