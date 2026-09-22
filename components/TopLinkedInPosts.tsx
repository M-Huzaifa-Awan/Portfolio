import Image, { type StaticImageData } from "next/image";
import {
  BarChart3,
  ChevronDown,
  Eye,
  Linkedin,
  MousePointerClick,
  UserPlus,
  Users,
} from "lucide-react";
import postOneImage from "@/1.png";
import postTwoImage from "@/2.png";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

type Demographic = {
  category: string;
  label: string;
  percent: number;
};

type LinkedInPostAnalytics = {
  id: number;
  headline: string;
  image: StaticImageData;
  imageAlt: string;
  impressions: string;
  membersReached: string;
  inNetwork: number;
  outOfNetwork: number;
  profileViewers: string;
  followersGained: string;
  socialEngagements: string;
  reactions: string;
  comments: string;
  reposts: string;
  saves: string;
  sends: string;
  linkEngagements?: string;
  linkLabel?: string;
  recruiters: string;
  upworkViewers: string;
  fiverrViewers: string;
  demographics: Demographic[];
};

const TOP_LINKEDIN_POSTS: LinkedInPostAnalytics[] = [
  {
    id: 1,
    headline:
      "My personal portfolio site huzaifaawan.com got hit with 854 denied requests in under 24 hours.",
    image: postOneImage,
    imageAlt:
      "LinkedIn post showing security analytics for 854 denied requests to the portfolio",
    impressions: "56,688",
    membersReached: "38,011",
    inNetwork: 1,
    outOfNetwork: 99,
    profileViewers: "124",
    followersGained: "13",
    socialEngagements: "166",
    reactions: "100",
    comments: "46",
    reposts: "1",
    saves: "18",
    sends: "1",
    linkEngagements: "780",
    linkLabel: "huzaifaawan.com",
    recruiters: "26",
    upworkViewers: "5",
    fiverrViewers: "4",
    demographics: [
      { category: "Seniority", label: "Entry", percent: 45 },
      { category: "Industry", label: "Software Development", percent: 42 },
      { category: "Job title", label: "Software Engineer", percent: 23 },
      { category: "Company size", label: "11–50 employees", percent: 19 },
      { category: "Location", label: "Lahore", percent: 10 },
      { category: "Company", label: "Upwork", percent: 1 },
    ],
  },
  {
    id: 2,
    headline:
      "Your GitHub profile is the first thing many recruiters check. Make it memorable. 🚀",
    image: postTwoImage,
    imageAlt:
      "LinkedIn post showing a redesigned GitHub profile as a developer portfolio",
    impressions: "34,723",
    membersReached: "22,447",
    inNetwork: 2,
    outOfNetwork: 98,
    profileViewers: "140",
    followersGained: "36",
    socialEngagements: "299",
    reactions: "204",
    comments: "25",
    reposts: "1",
    saves: "67",
    sends: "2",
    recruiters: "26",
    upworkViewers: "7",
    fiverrViewers: "6",
    demographics: [
      { category: "Industry", label: "Software Development", percent: 45 },
      { category: "Seniority", label: "Entry", percent: 43 },
      { category: "Job title", label: "Software Engineer", percent: 19 },
      { category: "Company size", label: "11–50 employees", percent: 15 },
      { category: "Location", label: "Lahore", percent: 12 },
      { category: "Company", label: "Fiverr", percent: 1 },
    ],
  },
];

function Metric({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-black/20 p-3.5">
      <dt className="text-xs leading-relaxed text-muted">{label}</dt>
      <dd
        className={
          featured
            ? "mt-1 font-heading text-2xl font-semibold text-accent"
            : "mt-1 font-heading text-xl font-semibold text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function AnalyticsDetails({ post }: { post: LinkedInPostAnalytics }) {
  return (
    <div className="grid gap-4 border-t border-line p-5 sm:p-6 lg:grid-cols-2">
      <section
        aria-labelledby={"discovery-" + post.id}
        className="rounded-2xl border border-line bg-white/[0.02] p-5"
      >
        <div className="flex items-center gap-2">
          <BarChart3 aria-hidden="true" className="h-4 w-4 text-accent" />
          <h4
            id={"discovery-" + post.id}
            className="font-heading font-semibold text-ink"
          >
            Discovery
          </h4>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <Metric label="Impressions" value={post.impressions} featured />
          <Metric label="Members reached" value={post.membersReached} />
        </dl>
        <div className="mt-5">
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-muted">In-network</span>
            <span className="font-medium text-ink">{post.inNetwork}%</span>
          </div>
          <div
            className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/[0.06]"
            aria-label={
              post.inNetwork +
              "% in-network and " +
              post.outOfNetwork +
              "% out-of-network"
            }
          >
            <span
              className="bg-[#70b5f9]"
              style={{ width: post.inNetwork + "%" }}
            />
            <span
              className="bg-accent"
              style={{ width: post.outOfNetwork + "%" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-4 text-xs">
            <span className="text-muted">Out-of-network</span>
            <span className="font-medium text-accent">
              {post.outOfNetwork}%
            </span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby={"profile-activity-" + post.id}
        className="rounded-2xl border border-line bg-white/[0.02] p-5"
      >
        <div className="flex items-center gap-2">
          <Eye aria-hidden="true" className="h-4 w-4 text-accent" />
          <h4
            id={"profile-activity-" + post.id}
            className="font-heading font-semibold text-ink"
          >
            Profile activity
          </h4>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <Metric label="Profile viewers from this post" value={post.profileViewers} />
          <Metric label="Followers gained from this post" value={post.followersGained} />
        </dl>
        <div className="mt-5 rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
          <p className="text-xs text-muted">Recruiters who viewed your profile</p>
          <p className="mt-1 font-heading text-2xl font-semibold text-ink">
            {post.recruiters}
          </p>
        </div>
      </section>

      <section
        aria-labelledby={"engagement-" + post.id}
        className="rounded-2xl border border-line bg-white/[0.02] p-5"
      >
        <div className="flex items-center gap-2">
          <Users aria-hidden="true" className="h-4 w-4 text-accent" />
          <h4
            id={"engagement-" + post.id}
            className="font-heading font-semibold text-ink"
          >
            Engagement
          </h4>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Metric label="Social engagements" value={post.socialEngagements} featured />
          <Metric label="Reactions" value={post.reactions} />
          <Metric label="Comments" value={post.comments} />
          <Metric label="Reposts" value={post.reposts} />
          <Metric label="Saves" value={post.saves} />
          <Metric label="Sends on LinkedIn" value={post.sends} />
        </dl>
        {post.linkEngagements && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#70b5f9]/20 bg-[#0a66c2]/10 p-4">
            <MousePointerClick
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-[#70b5f9]"
            />
            <div>
              <p className="text-xs text-muted">
                Visits to {post.linkLabel}
              </p>
              <p className="mt-0.5 font-heading text-xl font-semibold text-ink">
                {post.linkEngagements}
              </p>
            </div>
          </div>
        )}
      </section>

      <section
        aria-labelledby={"audience-" + post.id}
        className="rounded-2xl border border-line bg-white/[0.02] p-5"
      >
        <div className="flex items-center gap-2">
          <UserPlus aria-hidden="true" className="h-4 w-4 text-accent" />
          <h4
            id={"audience-" + post.id}
            className="font-heading font-semibold text-ink"
          >
            Audience signals
          </h4>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <Metric label="Work at Upwork" value={post.upworkViewers} />
          <Metric label="Work at Fiverr" value={post.fiverrViewers} />
        </dl>
        <div className="mt-5 space-y-4">
          {post.demographics.map((item) => (
            <div key={item.category}>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">
                    {item.category}
                  </p>
                  <p className="mt-0.5 text-sm text-ink">{item.label}</p>
                </div>
                <span className="text-sm font-semibold text-ink">
                  {item.percent}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  aria-hidden="true"
                  className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
                  style={{ width: item.percent + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TopLinkedInPosts() {
  return (
    <Section id="linkedin-posts">
      <SectionHeading
        eyebrow="LinkedIn impact"
        title={
          <>
            Posts that reached{" "}
            <span className="text-gradient">beyond my network.</span>
          </>
        }
        description="Two analytics snapshots showing how technical content translated into reach, engagement, profile discovery and real portfolio visits."
      />

      <div className="mt-12 grid items-start gap-6 lg:mt-14 lg:grid-cols-2">
        {TOP_LINKEDIN_POSTS.map((post, index) => (
          <Reveal key={post.id} delayIndex={index}>
            <article className="overflow-hidden rounded-3xl border border-line bg-[#0d0f11] shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-[#171b20]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-contain object-top"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  <Linkedin aria-hidden="true" className="h-3.5 w-3.5 text-[#70b5f9]" />
                  Top post {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-base leading-relaxed text-ink">
                  {post.headline}
                </p>
                <dl className="mt-5 grid grid-cols-3 gap-2.5">
                  <Metric label="Impressions" value={post.impressions} featured />
                  <Metric label="Reached" value={post.membersReached} />
                  <Metric
                    label={post.linkEngagements ? "Link visits" : "Followers"}
                    value={post.linkEngagements ?? post.followersGained}
                  />
                </dl>
              </div>

              <details className="group/details border-t border-line">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                  View full analytics
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 text-muted transition-transform duration-200 group-open/details:rotate-180"
                  />
                </summary>
                <AnalyticsDetails post={post} />
              </details>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
