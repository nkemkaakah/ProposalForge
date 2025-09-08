interface DemoDigestEmailProps {
  companyName: string;
}

export default function DemoDigestEmail({ companyName }: DemoDigestEmailProps) {
  const containerStyles = {
    padding: '48px',
    backgroundColor: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
  };

  const textStyle = {
    color: '#4b4545',
    fontSize: '14px',
    lineHeight: '1.7'
  };

  const h1Style = {
    color: '#181818',
    fontSize: '24px',
    fontWeight: '600',
    margin: '20px 0 16px 0'
  };

  const h2Style = {
    color: '#181818',
    fontSize: '18px',
    fontWeight: '500',
    margin: '40px 0 16px 0'
  };

  const h3Style = {
    color: '#181818',
    fontSize: '15px',
    fontWeight: '500',
    margin: '24px 0 8px 0'
  };

  const strongStyle = {
    fontWeight: '600'
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'underline'
  };

  const blockquoteStyle = {
    background: '#f9f9f9',
    borderLeft: '10px solid #ccc',
    margin: '1.5em 10px',
    padding: '1em 10px'
  };

  const hrStyle = {
    borderColor: '#f9f9f9',
    margin: '40px 0',
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid'
  };

  return (
    <div style={containerStyles} data-testid="email-preview-content">
      <p style={textStyle}>
        <img 
          src="https://app.rulebase.co/img/rulebase-logo.png" 
          alt="Rulebase" 
          width="64" 
          height="64" 
          style={{ marginBottom: '16px' }}
        />
      </p>
      
      <h1 style={h1Style}>
        Customer insights for {companyName}
      </h1>
      
      <p style={textStyle}>
        Here are your customer insights from Rulebase for <strong style={strongStyle}>September 1, 2025 - September 7, 2025</strong>.
      </p>
      
      <p style={textStyle}>This week:</p>
      
      <ul style={textStyle}>
        <li style={textStyle}>We evaluated <strong style={strongStyle}>928 total tickets</strong> (5387 total chats, calls, and emails)</li>
        <li style={textStyle}>The average QA score was <strong style={strongStyle}>95/100</strong> (<strong style={strongStyle}>+1</strong> point from last week)</li>
        <li style={textStyle}>Customers reported <strong style={strongStyle}>434 complaints</strong> about <strong style={strongStyle}>payment processing issues</strong> (17%), <strong style={strongStyle}>account verification problems</strong> (14%), and <strong style={strongStyle}>transaction failures</strong> (11%)</li>
        <li style={textStyle}>Customers reported <strong style={strongStyle}>588 service issues</strong> with <strong style={strongStyle}>delayed transactions</strong> (24%), <strong style={strongStyle}>system downtime</strong> (15%), and <strong style={strongStyle}>mobile app errors</strong> (8%)</li>
        <li style={textStyle}>Customers reported <strong style={strongStyle}>8 product issues</strong> with <strong style={strongStyle}>loan application failures</strong> and <strong style={strongStyle}>card activation problems</strong></li>
      </ul>
      
      <p style={textStyle}>
        <img 
          src="https://email-assets.rulebase.co/demo/weekly-overview-chart.png" 
          alt="Weekly Overview Chart" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '20px 0', display: 'block' }}
        />
      </p>
      
      <hr style={hrStyle} />
      
      <h2 style={h2Style}>Complaints</h2>
      
      <p style={textStyle}>
        There were <strong style={strongStyle}>434 complaints</strong> this week with <strong style={strongStyle}>5 high-risk</strong> and <strong style={strongStyle}>429 medium-risk</strong>.
      </p>
      
      <p style={textStyle}>These were the most frequent complaints:</p>
      
      <ul style={textStyle}>
        <li style={textStyle}><strong style={strongStyle}>75 (17%)</strong> were <strong style={strongStyle}>payment processing issues</strong>. For example, <a href="#" style={linkStyle}>customer reported failed transaction with no refund</a></li>
        <li style={textStyle}><strong style={strongStyle}>60 (14%)</strong> were <strong style={strongStyle}>account verification issues</strong>. For example, <a href="#" style={linkStyle}>account locked during KYC process</a></li>
        <li style={textStyle}><strong style={strongStyle}>47 (11%)</strong> were <strong style={strongStyle}>transaction failures</strong>. For example, <a href="#" style={linkStyle}>multiple failed transfer attempts</a></li>
      </ul>
      
      <p style={textStyle}>
        <strong style={strongStyle}>Top service categories mentioned in complaints this week were:</strong> Mobile Banking (75 tickets, 17%), Online Transfers (35 tickets, 8%), Card Services (28 tickets, 6%), and Customer Support (22 tickets, 5%).
      </p>
      
      <h3 style={h3Style}>
        1. <a href="#" style={linkStyle}>Payment processing failure - Account debited without service delivery</a>
      </h3>
      
      <p style={textStyle}><strong style={strongStyle}>Handling agents:</strong> Sarah Johnson, Michael Chen, Rebecca Adams</p>
      <p style={textStyle}><strong style={strongStyle}>Date:</strong> September 5, 2025</p>
      <p style={textStyle}><strong style={strongStyle}>Status:</strong> In Progress</p>
      <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
      <p style={textStyle}>
        Customer reported being debited ₦75,000 for a bill payment transaction that failed on September 5th, 2025. Despite multiple follow-ups and confirmation that the transaction failed, the customer has not received a reversal.
      </p>
      
      <div style={blockquoteStyle}>
        <p style={textStyle}>"When am I going to get my money back? This is very frustrating."</p>
      </div>
      
      <h3 style={h3Style}>
        2. <a href="#" style={linkStyle}>Account verification delays causing business disruption</a>
      </h3>
      
      <p style={textStyle}><strong style={strongStyle}>Handling agents:</strong> David Wilson, Amanda Martinez</p>
      <p style={textStyle}><strong style={strongStyle}>Date:</strong> September 4, 2025</p>
      <p style={textStyle}><strong style={strongStyle}>Status:</strong> Resolved</p>
      <p style={textStyle}><strong style={strongStyle}>Summary:</strong></p>
      <p style={textStyle}>
        Business customer reported that their account verification has been pending for over two weeks despite submitting all required documents. This delay has prevented them from processing important business transactions.
      </p>
      
      <div style={blockquoteStyle}>
        <p style={textStyle}>"This delay is affecting my business operations. I need this resolved urgently."</p>
      </div>
      
      <hr style={hrStyle} />
      
      <h2 style={h2Style}>Service Issues</h2>
      
      <p style={textStyle}>
        There were <strong style={strongStyle}>588 service issues</strong> reported this week, with <strong style={strongStyle}>12 critical</strong> and <strong style={strongStyle}>576 standard</strong> priority issues.
      </p>
      
      <ul style={textStyle}>
        <li style={textStyle}><strong style={strongStyle}>141 (24%)</strong> were related to <strong style={strongStyle}>delayed transactions</strong></li>
        <li style={textStyle}><strong style={strongStyle}>88 (15%)</strong> were related to <strong style={strongStyle}>system downtime</strong></li>
        <li style={textStyle}><strong style={strongStyle}>47 (8%)</strong> were related to <strong style={strongStyle}>mobile app errors</strong></li>
      </ul>
      
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <a 
          href={`https://app.rulebase.co/reports/${companyName.toLowerCase().replace(/\s+/g, '-')}/detailed`}
          style={{
            background: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
            boxShadow: '0 4px 12px rgba(55, 65, 81, 0.4)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            display: 'inline-block'
          }}
        >
          View detailed report
        </a>
      </div>
      
      <hr style={hrStyle} />
      
      <p style={{ ...textStyle, color: '#999', fontSize: '12px', textAlign: 'center' }}>
        This report was generated by Rulebase AI for {companyName}.<br />
        Questions? Reply to this email or contact support@rulebase.co
      </p>
    </div>
  );
}
