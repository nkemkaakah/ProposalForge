import React from 'react';

export interface DemoDigestEmailProps {
  companyName: string;
  bannerImageUrl?: string;
  chartImageUrl?: string;
  dateRange?: string;
  totalTickets?: string;
  qaScore?: string;
  totalInteractions?: string;
}

export default function DemoDigestEmail({ 
  companyName, 
  bannerImageUrl, 
  chartImageUrl, 
  dateRange = "September 1, 2025 - September 7, 2025",
  totalTickets = "928",
  qaScore = "95",
  totalInteractions = "5387"
}: DemoDigestEmailProps) {
  const containerStyles = {
    padding: '0',
    backgroundColor: '#ffffff',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
  };

  const headerBannerStyle = {
    background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              {companyName} ⚡
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px' }}>
              CUSTOMER DIGEST
            </div>
          </div>
          <div style={{ opacity: 0.6 }}>
            <img 
              src={bannerImageUrl || "https://via.placeholder.com/200x150/ffffff/1f2937?text=📊"} 
              alt="Report Visual" 
              style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>

      <div style={contentPadding}>
        <h1 style={h1Style}>
          Customer insights for {companyName}
        </h1>
        
        <p style={textStyle}>
          Here are your customer insights from Rulebase for <strong style={strongStyle}>{dateRange}</strong>.
        </p>
        
        <p style={textStyle}>This week:</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>We evaluated <strong style={strongStyle}>{totalTickets} total tickets</strong> ({totalInteractions} total chats, calls, and emails)</li>
          <li style={{ marginBottom: '8px' }}>The average QA score was <strong style={strongStyle}>{qaScore}/100</strong> (<strong style={strongStyle}>+1</strong> point from last week)</li>
          <li style={{ marginBottom: '8px' }}>Customers reported <strong style={strongStyle}>434 complaints</strong> about <strong style={strongStyle}>Spectranet payment issues</strong> (17%), <strong style={strongStyle}>school fee payment problems</strong> (14%), and <strong style={strongStyle}>flight ticket payment issues</strong> (11%)</li>
          <li style={{ marginBottom: '8px' }}>Customers reported <strong style={strongStyle}>588 service issues</strong> with <strong style={strongStyle}>missing Spectranet credits</strong> (24%), <strong style={strongStyle}>Quickteller payment failures</strong> (15%), and <strong style={strongStyle}>delayed school fee payments</strong> (8%)</li>
          <li style={{ marginBottom: '8px' }}>Customers reported <strong style={strongStyle}>8 product issues</strong> with <strong style={strongStyle}>loan request failures</strong> and <strong style={strongStyle}>account verification problems</strong></li>
        </ul>

        {/* Key Metrics Chart */}
        <div style={chartBoxStyle}>
          <div style={metricBoxStyle}>
            <div style={metricLabelStyle}>AVERAGE QA SCORE</div>
            <span style={bigNumberStyle}>{qaScore}</span>
            <div style={{ fontSize: '12px', color: '#10b981' }}>📈 +1</div>
          </div>
          <div style={metricBoxStyle}>
            <div style={metricLabelStyle}>TICKETS REVIEWED</div>
            <span style={bigNumberStyle}>{totalTickets}</span>
          </div>
          <div style={metricBoxStyle}>
            <div style={metricLabelStyle}>CALLS, CHATS AND EMAILS REVIEWED</div>
            <span style={bigNumberStyle}>{totalInteractions}</span>
          </div>
        </div>

        {chartImageUrl && (
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <img 
              src={chartImageUrl as string} 
              alt="Weekly Overview Chart" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        )}

        <hr style={hrStyle} />

        {/* Complaints Section */}
        <h2 style={h2Style}>Complaints</h2>
        
        <p style={textStyle}>
          There were <strong style={strongStyle}>434 complaints</strong> this week with <strong style={strongStyle}>5 high-risk</strong> and <strong style={strongStyle}>429 medium-risk</strong>.
        </p>
        
        <p style={textStyle}>These were the most frequent complaints:</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong style={strongStyle}>75 (17%)</strong> were <strong style={strongStyle}>Spectranet payment issues</strong>. For example, <a href="#" style={linkStyle}>Ike Okeke</a></li>
          <li style={{ marginBottom: '8px' }}><strong style={strongStyle}>60 (14%)</strong> were <strong style={strongStyle}>school fee payment issues</strong>. For example, <a href="#" style={linkStyle}>GODWIN SHITTU</a></li>
          <li style={{ marginBottom: '8px' }}><strong style={strongStyle}>47 (11%)</strong> were <strong style={strongStyle}>flight ticket payment issues</strong>. For example, <a href="#" style={linkStyle}>George</a></li>
        </ul>

        <p style={textStyle}>
          <strong style={strongStyle}>Top providers mentioned in complaints this week were:</strong> Spectranet (75 tickets, 17%), Afe Babalola University (3 tickets, 1%), EEDC (4 tickets, 1%), and WAEC (3 tickets, 1%).
        </p>

        {/* Complaint Categories */}
        <div style={categoryContainerStyle}>
          <div style={categoryBoxStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Spectranet payment issues</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>75 INTERACTIONS</div>
            <div style={{ fontSize: '12px' }}>17% OF COMPLAINTS</div>
          </div>
          <div style={categoryBoxStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>School fees payment issues</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>60 INTERACTIONS</div>
            <div style={{ fontSize: '12px' }}>14% OF COMPLAINTS</div>
          </div>
          <div style={categoryBoxStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Flight ticket payment issues</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>47 INTERACTIONS</div>
            <div style={{ fontSize: '12px' }}>11% OF COMPLAINTS</div>
          </div>
        </div>

        {/* Detailed Complaint Cases */}
        <h3 style={h3Style}>
          1. <a href="#" style={linkStyle}>Failed Transaction Debited Within 24 Hours Opay</a>
        </h3>
        
        <div style={ticketDetailStyle}>
          <p style={textStyle}><strong style={strongStyle}>Customer:</strong> Alibabaabdulmujeeb3</p>
          <p style={textStyle}><strong style={strongStyle}>Handling agents:</strong> Praise Agboola, Adebumiti Modupe, Janet Olawole, Nancy Iwhiwhu, Angela Ahaneku, Oluwatosin Olanrewaju</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> September 5, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Freshdesk ticket:</strong> <a href="#" style={linkStyle}>#925228</a></p>
          <p style={textStyle}><strong style={strongStyle}>Status:</strong> In Progress</p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer reported being debited ₦153,650 for a KWASU school payment transaction that failed on September 5th, 2025. Despite multiple follow-ups and confirmation from Interswitch that the transaction failed with reminder emails sent to the bank, but the customer continues to follow up daily seeking resolution of the debited amount.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"Am I going to credit back"</p>
          </div>
        </div>

        <h3 style={h3Style}>
          2. <a href="#" style={linkStyle}>Pending Flight Transaction</a>
        </h3>
        
        <div style={ticketDetailStyle}>
          <p style={textStyle}><strong style={strongStyle}>Customer:</strong> George</p>
          <p style={textStyle}><strong style={strongStyle}>Handling agents:</strong> Matthew Sikiru, Awotunde AdebayoChristopher, Victoria Adebayo</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> September 4, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Freshdesk ticket:</strong> <a href="#" style={linkStyle}>#925039</a></p>
          <p style={textStyle}><strong style={strongStyle}>Status:</strong> Resolved</p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer experienced repeated network issues causing transaction delays, with the same problem occurring the previous day. The ₦320,000 Ibom Air flight ticket transaction remained pending beyond the expected timeframe, leading to significant customer frustration. The transaction was eventually confirmed successful and value was provided by Ibom Air, but the customer expressed ongoing concerns about network reliability issues affecting daily transactions.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"You guys should work on your network because it's becoming everyday thing. Same thing happened yesterday."</p>
          </div>
        </div>

        <h3 style={h3Style}>
          3. <a href="#" style={linkStyle}>Urgent Complaint: Prolonged Inactivity of My Paypoint Accounts – No Response for Over 5 Months</a>
        </h3>
        
        <div style={ticketDetailStyle}>
          <p style={textStyle}><strong style={strongStyle}>Customer:</strong> Abdulhakim Muhammad</p>
          <p style={textStyle}><strong style={strongStyle}>Handling agent:</strong> Ruth Ayomide Joseph</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> September 2, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Freshdesk ticket:</strong> <a href="#" style={linkStyle}>#923879</a></p>
          <p style={textStyle}><strong style={strongStyle}>Status:</strong> In progress</p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer reported that their Paypoint accounts have been inactive for over five months despite submitting all required documents. This prolonged inactivity has disrupted their business operations and damaged their credibility, leading to high frustration and a perception of unprofessional service. The agent responded empathetically and confirmed receipt and escalation of documents.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"I find this level of neglect extremely unprofessional, especially considering how long this matter has been left unattended. As a registered agent relying on this service, the continuous delay has not only disrupted my operations but also affected my business credibility."</p>
          </div>
        </div>

        <p style={textStyle}>
          <a href="#" style={linkStyle}>View all complaints this week →</a>
        </p>

        <hr style={hrStyle} />

        {/* Service Issues Section */}
        <h2 style={h2Style}>Service issues</h2>

        {/* Service Categories */}
        <div style={categoryContainerStyle}>
          <div style={categoryBoxStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Missing Spectranet credits</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>142 INTERACTIONS</div>
            <div style={{ fontSize: '12px' }}>24% OF COMPLAINTS</div>
          </div>
          <div style={categoryBoxStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quickteller payment failures</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>89 INTERACTIONS</div>
            <div style={{ fontSize: '12px' }}>15% OF COMPLAINTS</div>
          </div>
          <div style={categoryBoxStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Delayed school fee payments</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>45 INTERACTIONS</div>
            <div style={{ fontSize: '12px' }}>8% OF COMPLAINTS</div>
          </div>
        </div>
        
        <p style={textStyle}>
          There were <strong style={strongStyle}>588 service issues</strong> this week with <strong style={strongStyle}>1 high-risk</strong>, <strong style={strongStyle}>547 medium-risk</strong>, and <strong style={strongStyle}>40 low-risk</strong>.
        </p>
        
        <p style={textStyle}>These were the most frequent service issues:</p>
        
        <ul style={{ ...textStyle, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong style={strongStyle}>142 (24%)</strong> were <strong style={strongStyle}>missing Spectranet credits</strong>. For example, <a href="#" style={linkStyle}>Official donmosco</a> (in progress) customer payment of ₦12,000 not credited with reversal pending investigation.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong style={strongStyle}>89 (15%)</strong> were <strong style={strongStyle}>Quickteller payment failures</strong>. For example, <a href="#" style={linkStyle}>Rukkytots</a> (in progress) experienced delayed Quickteller payment verification causing urgent dissatisfaction with ₦35,109 Spectranet payment.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong style={strongStyle}>45 (8%)</strong> were <strong style={strongStyle}>delayed school fee payments</strong>. For example, <a href="#" style={linkStyle}>GODWIN SHITTU</a> (in progress) paid ₦275,300 resit fee but hasn't received service value yet on Afe Babalola University portal.
          </li>
        </ul>

        <p style={textStyle}>
          Top providers mentioned in service issues this week were: Spectranet (142 tickets, 24%), Afe Babalola University (25 tickets, 4%), and EEDC (15 tickets, 3%).
        </p>

        <p style={textStyle}>
          <a href="#" style={linkStyle}>View all service issues this week →</a>
        </p>

        <hr style={hrStyle} />

        {/* Product Issues Section */}
        <h2 style={h2Style}>Product issues</h2>
        
        <p style={textStyle}>
          There were <strong style={strongStyle}>8 product issues</strong> this week with <strong style={strongStyle}>5 medium-risk</strong> and <strong style={strongStyle}>3 low-risk</strong>.
        </p>

        <h3 style={h3Style}>
          1. <a href="#" style={linkStyle}>Loan Request - Opay Account Verification Failure</a>
        </h3>
        
        <div style={ticketDetailStyle}>
          <p style={textStyle}><strong style={strongStyle}>Customer:</strong> Gamaliel Hyeinmen</p>
          <p style={textStyle}><strong style={strongStyle}>Date:</strong> September 5, 2025</p>
          <p style={textStyle}><strong style={strongStyle}>Freshdesk ticket:</strong> <a href="#" style={linkStyle}>#925370</a></p>
          <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
          <p style={textStyle}>
            Customer is experiencing a verification failure with their Opay account on the Quickteller app, preventing access to a loan offer they urgently need. The agent provided a thorough and professional response, advising the customer to retry due to possible network issues and to try another bank card if the problem persists.
          </p>
          
          <div style={blockquoteStyle}>
            <p style={textStyle}>"Please I am trying to get a loan on the app. I got an offer but it keeps saying that it cannot verify my opay account and I urgently need this money. I cannot get a different ATM Card for another local bank account till Monday and the urgency cannot wait till Monday."</p>
          </div>
        </div>

        <p style={textStyle}>
          <a href="#" style={linkStyle}>View all product issues this week →</a>
        </p>

        <hr style={hrStyle} />

        {/* Scorecard Performance Section */}
        <h2 style={h2Style}>Scorecard performance</h2>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', margin: '24px 0' }}>
          <div style={scoreCardStyle}>
            <div style={metricLabelStyle}>Soft Skills</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>96/100</div>
            <div style={{ fontSize: '12px', background: '#10b981', padding: '4px 8px', borderRadius: '4px' }}>+2 POINTS</div>
          </div>
          <div style={scoreCardStyle}>
            <div style={metricLabelStyle}>Technical Skills</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>95/100</div>
            <div style={{ fontSize: '12px', background: '#6b7280', padding: '4px 8px', borderRadius: '4px' }}>NO CHANGE</div>
          </div>
          <div style={scoreCardStyle}>
            <div style={metricLabelStyle}>Process & Regulatory Compliance</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>98/100</div>
            <div style={{ fontSize: '12px', background: '#6b7280', padding: '4px 8px', borderRadius: '4px' }}>NO CHANGE</div>
          </div>
        </div>

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