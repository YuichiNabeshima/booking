import schedule from 'node-schedule';
import * as modelFnMailQue from '~/models/fn/mail_que';
import * as modelFnMailLog from '~/models/fn/mail_log';
import { sendEmail } from '~/models/mail_que';

const rule = new schedule.RecurrenceRule();
rule.second = 30;

schedule.scheduleJob(rule, async function() {
  const mailList = await modelFnMailQue.fetchAll();

  if (mailList.length === 0) {
    console.log('skip');
    return;
  }

  mailList.forEach(async mailQue => {
    await sendEmail(mailQue.id);
    await modelFnMailQue.remove({ id: mailQue.id });
    await modelFnMailLog.create({
      from: mailQue.from,
      to: mailQue.to,
      title: mailQue.title,
      body: mailQue.body,
    });
  });
});

