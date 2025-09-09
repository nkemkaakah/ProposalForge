import React from 'react';

export interface DemoDigestEmailProps {
  companyName: string;
  customerName1?: string;
  customerName2?: string;
  customerName3?: string;
  bannerImageUrl?: string;
  chartImageUrl?: string;
  logoImageUrl?: string;
  complaintChartUrl?: string;
  metricsImageUrl?: string;
  scorecardImageUrl?: string;
  serviceIssuesImageUrl?: string;
}

export default function DemoDigestEmail({ 
  companyName,
  customerName1 = "Marcus Rivera",
  customerName2 = "Elena Nakamura", 
  customerName3 = "Kwame Asante",
  bannerImageUrl,
  chartImageUrl,
  logoImageUrl,
  complaintChartUrl,
  metricsImageUrl,
  scorecardImageUrl,
  serviceIssuesImageUrl
}: DemoDigestEmailProps) {
  const containerStyles = {
    padding: '0',
    backgroundColor: '#ffffff',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
  };

  const headerBannerStyle = {
    background: bannerImageUrl 
      ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerImageUrl})`
      : 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '40px 48px',
    color: 'white',
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const contentPadding = {
    padding: '0 48px'
  };

  const textStyle = {
    color: '#4b4545',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 12px 0'
  };

  const h1Style = {
    color: '#181818',
    fontSize: '28px',
    fontWeight: '600',
    margin: '24px 0 16px 0'
  };

  const h2Style = {
    color: '#181818',
    fontSize: '20px',
    fontWeight: '600',
    margin: '40px 0 20px 0'
  };

  const h3Style = {
    color: '#181818',
    fontSize: '16px',
    fontWeight: '600',
    margin: '24px 0 12px 0'
  };

  const strongStyle = {
    fontWeight: '600',
    color: '#181818'
  };

  const linkStyle = {
    color: '#3b82f6',
    textDecoration: 'underline'
  };

  const blockquoteStyle = {
    background: '#f8f9fa',
    borderLeft: '4px solid #e5e7eb',
    margin: '16px 0',
    padding: '16px 20px',
    fontStyle: 'italic',
    color: '#6b7280'
  };

  const hrStyle = {
    borderColor: '#e5e7eb',
    margin: '40px 0',
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid'
  };

  const chartBoxStyle = {
    background: '#1f2937',
    color: 'white',
    padding: '24px',
    borderRadius: '8px',
    margin: '24px 0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  };

  const metricBoxStyle = {
    textAlign: 'center' as const,
    padding: '16px'
  };

  const bigNumberStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    display: 'block',
    lineHeight: '1'
  };

  const metricLabelStyle = {
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    opacity: 0.8,
    marginBottom: '8px'
  };

  const categoryBoxStyle = {
    background: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)',
    color: 'white',
    padding: '16px',
    borderRadius: '6px',
    margin: '8px',
    textAlign: 'center' as const,
    minWidth: '160px'
  };

  const categoryContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '8px',
    margin: '24px 0'
  };

  const scoreCardStyle = {
    background: '#1f2937',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    margin: '8px',
    minWidth: '140px'
  };

  const ticketDetailStyle = {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    margin: '16px 0'
  };

  return (
    <div style={containerStyles} data-testid="email-preview-content">
      {/* Header Banner */}
      <div style={headerBannerStyle}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            {companyName} ⚡
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px' }}>
            CUSTOMER DIGEST
          </div>
        </div>
      </div>

      <div style={contentPadding}>
        <h1 style={h1Style}>
          Customer insights for {companyName}
        </h1>
        
        <p style={textStyle}>
          Here are your customer insights from {companyName} for <strong style={strongStyle}>October 15, 2025 - October 21, 2025</strong>.
        </p>
        
        <p style={textStyle}>This week:</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>We evaluated <strong style={strongStyle}>1,247 total tickets</strong> (6,892 total chats, calls, and emails)</li>
          <li style={{ marginBottom: '8px' }}>The average QA score was <strong style={strongStyle}>87/100</strong> (<strong style={strongStyle}>-3</strong> points from last week)</li>
          <li style={{ marginBottom: '8px' }}>Customers reported <strong style={strongStyle}>623 complaints</strong> about <strong style={strongStyle}>crypto withdrawal delays</strong> (22%), <strong style={strongStyle}>KYC verification issues</strong> (18%), and <strong style={strongStyle}>fee discrepancies</strong> (15%)</li>
          <li style={{ marginBottom: '8px' }}>Customers reported <strong style={strongStyle}>741 service issues</strong> with <strong style={strongStyle}>API downtime</strong> (31%), <strong style={strongStyle}>security authentication</strong> (19%), and <strong style={strongStyle}>payment gateway errors</strong> (12%)</li>
          <li style={{ marginBottom: '8px' }}>Customers reported <strong style={strongStyle}>14 product issues</strong> with <strong style={strongStyle}>investment dashboard</strong> and <strong style={strongStyle}>multi-currency wallet sync</strong></li>
        </ul>

        {/* Scorecard Performance (Dynamic Image) */}
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <img
            src={scorecardImageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80"}
            alt="Scorecard Performance"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>

        <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <img 
              src={chartImageUrl || metricsImageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80"} 
              alt="Weekly Overview Chart" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>

        <hr style={hrStyle} />

        {/* Complaints Section */}
        <h2 style={h2Style}>Complaints</h2>
        
        <p style={textStyle}>
          There were <strong style={strongStyle}>623 complaints</strong> this week with <strong style={strongStyle}>9 high-risk</strong> and <strong style={strongStyle}>614 medium-risk</strong>.
        </p>
        
        <p style={textStyle}>These were the most frequent complaints:</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong style={strongStyle}>137 (22%)</strong> were <strong style={strongStyle}>cryptocurrency withdrawal delays</strong>. For example, <a href="#" style={linkStyle}>{customerName1}</a></li>
          <li style={{ marginBottom: '8px' }}><strong style={strongStyle}>112 (18%)</strong> were <strong style={strongStyle}>identity verification failures</strong>. For example, <a href="#" style={linkStyle}>{customerName2}</a></li>
          <li style={{ marginBottom: '8px' }}><strong style={strongStyle}>93 (15%)</strong> were <strong style={strongStyle}>unexpected transaction fees</strong>. For example, <a href="#" style={linkStyle}>{customerName3}</a></li>
        </ul>

        <p style={textStyle}>
          <strong style={strongStyle}>Top service categories mentioned in complaints this week were:</strong> Crypto Trading (137 tickets, 22%), KYC Verification (89 tickets, 14%), Fee Management (67 tickets, 11%), and Wallet Services (45 tickets, 7%).
        </p>

        {/* Complaint Categories Image */}
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <img
            src={complaintChartUrl || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=300&q=80"}
            alt="Complaint Categories Breakdown"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>

        {/* Detailed Complaint Cases */}
        <h3 style={h3Style}>
          1. <a href="#" style={linkStyle}>Bitcoin withdrawal stuck in pending for 72 hours</a>
        </h3>
        
        <div style={ticketDetailStyle}>
            <p style={textStyle}><strong style={strongStyle}>Customer:</strong> {customerName1}</p>
          <p style={textStyle}><strong style={strongStyle}>Handling agents:</strong> Jordan Kim, Priya Sharma, Dev Patel, Zara Al-Rashid, Chen Wei, Sofia Gutierrez</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> October 18, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Support ticket:</strong> <a href="#" style={linkStyle}>#CRY-847291</a></p>
          <p style={textStyle}><strong style={strongStyle}>Status:</strong> In Progress</p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer initiated a Bitcoin withdrawal of 0.24 BTC (approximately $16,800) which has been stuck in pending status for over 72 hours. Network fees were properly deducted but the transaction hasn't been broadcast to the blockchain. The technical team is investigating potential issues with the hot wallet management system.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"This is unacceptable! I need my Bitcoin NOW. This is my trading capital and every hour costs me money!"</p>
          </div>
        </div>

        <h3 style={h3Style}>
          2. <a href="#" style={linkStyle}>Advanced KYC verification repeatedly failing</a>
        </h3>
        
        <div style={ticketDetailStyle}>
            <p style={textStyle}><strong style={strongStyle}>Customer:</strong> {customerName2}</p>
          <p style={textStyle}><strong style={strongStyle}>Handling agents:</strong> Aisha Mohammed, Lucas Rodriguez, Maya Singh</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> October 17, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Support ticket:</strong> <a href="#" style={linkStyle}>#KYC-749382</a></p>
          <p style={textStyle}><strong style={strongStyle}>Status:</strong> Resolved</p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer attempted Level 3 KYC verification multiple times with high-quality documents but the AI verification system kept rejecting the passport photos due to alleged quality issues. Manual review revealed the automated system had a bias against certain passport formats. Account was manually approved and system updated.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"Your system keeps rejecting my official government documents. This is discriminatory and preventing me from accessing higher trading limits."</p>
          </div>
        </div>

        <h3 style={h3Style}>
          3. <a href="#" style={linkStyle}>Hidden DeFi Staking Fees Causing Unexpected Losses</a>
        </h3>
        
        <div style={ticketDetailStyle}>
          <p style={textStyle}><strong style={strongStyle}>Customer:</strong> {customerName3}</p>
          <p style={textStyle}><strong style={strongStyle}>Handling agent:</strong> Isabella Thompson</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> October 16, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Support ticket:</strong> <a href="#" style={linkStyle}>#DFI-892445</a></p>
          <p style={textStyle}><strong style={strongStyle}>Status:</strong> In progress</p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer staked $50,000 worth of ETH in the platform's DeFi yield farming product but discovered undisclosed gas optimization fees and protocol management charges that reduced their expected returns by 23%. The fee structure was buried in technical documentation rather than clearly displayed during the staking process.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"You advertised 8.5% APY but I'm barely getting 6.5% because of these hidden fees that weren't clearly disclosed. This feels like false advertising and I want compensation for the misleading information."</p>
          </div>
        </div>

        <p style={textStyle}>
          <a href="#" style={linkStyle}>View all complaints this week →</a>
        </p>

        <hr style={hrStyle} />

        {/* Service Issues Section */}
        <h2 style={h2Style}>Service issues</h2>

        {/* Service Issues Categories Image */}
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <img
            src={serviceIssuesImageUrl || "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=300&q=80"}
            alt="Service Issues Categories Breakdown"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
        
        <p style={textStyle}>
          There were <strong style={strongStyle}>741 service issues</strong> this week with <strong style={strongStyle}>3 high-risk</strong>, <strong style={strongStyle}>682 medium-risk</strong>, and <strong style={strongStyle}>56 low-risk</strong>.
        </p>
        
        <p style={textStyle}>These were the most frequent service issues:</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong style={strongStyle}>230 (31%)</strong> were <strong style={strongStyle}>trading API disconnections</strong>. For example, <a href="#" style={linkStyle}>CryptoTrader_Pro</a> (resolved) lost $3,200 in potential profits due to 15-minute API outage during market volatility.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong style={strongStyle}>141 (19%)</strong> were <strong style={strongStyle}>SMS 2FA delivery failures</strong>. For example, <a href="#" style={linkStyle}>TokenMaster_2025</a> (in progress) unable to access account for 6 hours due to SMS provider issues in Southeast Asia region.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong style={strongStyle}>89 (12%)</strong> were <strong style={strongStyle}>fiat deposit processing delays</strong>. For example, <a href="#" style={linkStyle}>InvestorLux</a> (resolved) wire transfer of $125,000 took 4 business days instead of promised same-day processing.
          </li>
        </ul>

        <p style={textStyle}>
          Top service providers mentioned in issues this week were: Plaid Banking API (89 tickets, 12%), Twilio SMS (67 tickets, 9%), and Stripe Payment Gateway (45 tickets, 6%).
        </p>

        <p style={textStyle}>
          <a href="#" style={linkStyle}>View all service issues this week →</a>
        </p>

        <hr style={hrStyle} />

        {/* Product Issues Section */}
        <h2 style={h2Style}>Product issues</h2>
        
        <p style={textStyle}>
          There were <strong style={strongStyle}>14 product issues</strong> this week with <strong style={strongStyle}>8 medium-risk</strong> and <strong style={strongStyle}>6 low-risk</strong>.
        </p>

        <h3 style={h3Style}>
          1. <a href="#" style={linkStyle}>Multi-Currency Wallet Synchronization Bug</a>
        </h3>
        
        <div style={ticketDetailStyle}>
          <p style={textStyle}><strong style={strongStyle}>Customer:</strong> Alexandra Chen</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> October 19, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Support ticket:</strong> <a href="#" style={linkStyle}>#PRD-156789</a></p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer's multi-currency wallet is displaying incorrect balances across different cryptocurrencies. The USD equivalent calculations are off by significant amounts, showing $47,000 when the actual value should be $52,300. This affects their DeFi lending decisions and portfolio rebalancing strategies.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"I cannot make informed investment decisions when your wallet shows wrong balances. The USD conversions are completely off and this could cost me thousands in bad trades. Please fix this immediately!"</p>
          </div>
        </div>

        <p style={textStyle}>
          <a href="#" style={linkStyle}>View all product issues this week →</a>
        </p>

        <hr style={hrStyle} />

        {/* Scorecard Performance Section */}
        <h2 style={h2Style}>Scorecard performance</h2>

        {scorecardImageUrl ? (
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <img
              src={scorecardImageUrl}
              alt="Scorecard Performance"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center', margin: '24px 0', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <div style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>📊 Scorecard Performance Image</div>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Upload an image to show performance metrics and scores</div>
          </div>
        )}

        <p style={textStyle}>Based on this week's interactions, here are the average scorecard criteria scores (from lowest to highest):</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Technical Skills: 95/100 (no change from last week)</li>
          <li style={{ marginBottom: '8px' }}>Soft Skills: 96/100 (+2 points from last week)</li>
          <li style={{ marginBottom: '8px' }}>Process & Regulatory Compliance: 98/100 (no change from last week)</li>
        </ul>

        <hr style={hrStyle} />

        <p style={{ ...textStyle, color: '#999', fontSize: '12px', textAlign: 'center', marginTop: '40px' }}>
          © 2025 Rulebase. All rights reserved.
        </p>
      </div>
    </div>
  );
}