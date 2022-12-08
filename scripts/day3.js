function rucksackReorganization(contents) {
  return contents
    .trim()                                             // Remove trailing spaces in input.
    .split(/\n/)                                        // One array entry per input.
    .map(x => [                                         // Slice the sack's contents in two.
      new RegExp('[' + x.slice(0, x.length / 2) + ']'),   // Transform the first part into a regex.
      x.slice(x.length / 2),                              // The second part is normal.
    ])
    .map(x => x[1].match(x[0])[0])                      // Find the repeated item.
    .map(item => getPriority(item))                     // Get item priority
    .reduce((x, y) => x + y)                            // Sum all values together.
}

// Reduction by 
function badgeAssignment(contents, group_size) {
  return contents
    .trim()
    .match(new RegExp(`(?:\\w*(?:\\n|$)){${group_size}}`, 'g'))   // Separate elves in groups.
    .map(group => group.split(/\n/))                              // Separate each sack.

    .map(group => group.filter(sack => sack !== ''))              // Eliminate empty sacks.
    .filter(group => group.length !== 0)                          // Eliminate empty groups.

    .map(group => group.reduce((x, y) =>                          // Match the first sack's contents to the second's.
      x.match(new RegExp('[' + y + ']', 'g')).join('')            // Reduce and repeat until all sacks are matched.
    )[0])                                                         // Retrieve only one match.

    .map(item => getPriority(item))                               // Get the item's priority.
    .reduce((x, y) => x + y)                                      // Add up all priorities together.
}

function getPriority(item) {
  let priority = item.charCodeAt(0)   // Get the char code of the item
  return priority < 96                // Map the code to the value given in the exercise
    ? priority - 64 + 26
    : priority - 96
}

const rucksackContents = `
zBBtHnnHtwwHplmlRlzPLCpp
vvhJccJFGFcNsdNNJbhJsJQplQMRLQMlfdfTPCLfQQCT
GPhjcjhZDjWtnSVH
BNhHVhrGNVTbDHdDJdJRPJdSQQSJwPjR
lvtsfbsqzwSnJcvjSm
MftttFLftZMLgtgMbltMqZzbDNrTpVGhNWrDTrpTGNpZGZhD
VSSHcTgTtTdtllZlzmmbljTn
RqMqsFfQLLFLQFMMfRLPZLvPpCfWrbpmCbjCnfjlWmnrmmnm
hqRDqPDRsqNHwtHSNBZtJd
tNFDpDFrtdjfmjjjFmFFdScpZhZScTJgpHccHhMJgS
lLzSlSCQqbsVhBghggBZgCcJ
zRLVVLQnvQqVVzRldfWrwffjjdwSdfjv
bpWqqqWvHBpwGBCCRl
hJdjdJFQqdBBDMMC
tFFzJZFtJSqtZJQsWLbNSTnffHfvTH
lFhRZhFjPlqMlJqZJlJcRLwrLrwStRwtsVVtVSrgRV
WcpDvDfBmpDHzWBDbpbmWmNVSSTzLTtrVswgttVVzwwr
pbWfmGBpHfDmWnvvGbmWnjjMqPJMlMFPdGcjqPqPhP
NjFNRlpVLFCSSlbBWWfw
pssPZQQsMnzmtnQPttzDBbBJBcrrJWbrZSBJSbfC
QTHPHspMNGHdhvRR
QfPdSJfFJmthSthtwbsNLbPLlLTLpbvP
nHnMBnZqqgBMnWrZMqnZVcbCqRwNsvblRwppbllTsRNp
nZHBHznMnWgcrnVBtjFdfmzQNtNddjNF
hFhfPghppPhpRNhzsjsvHVzjpsGnWz
tTjlCCwMqtdMjMctGJWHwWnVwWnwvWGs
rZdrjBBtqdCtlcdgFZQLfhRLFSgRNP
RDHSWrJWffJFlJCgCMCDjCvzjPMP
QtGTndBwBtNzBVjBCMgB
LdwwMpTdwsRHsqSHqHJl
RfsfzvLLFvFzCSvSbDsTpTGMPMZPPTMt
jqWBjwBBNwWqwPGZbTwVwVtD
BnhgglhhNNngqjBjHNWrZLlFLSCJSFFCCQzQvQFCFF
HLvLDQbvnDQDvbHTLhntSnGBSlfGldddcmfMMf
NgFjZjrZZJrlfJfSVcBJGc
scWCNFZpsjzrDLwLhbQzhQwD
SlqJlThDPqpwSTwhcbDdbWDbZGcZNcDb
MsnWWjHjvLvfscjjgdzNdbgbcc
vQQvWVQFLLHfHVBWfsfmFFpJRhhSplqlRJqpBwlqTCPC
DZbDzzZDjQbPGZFFSSgSlFCzTgzm
qLnvwvhddrqMrwrCTLLFJjmtSlFlSH
VdhvsWqdVWvvRhsvqbpbPcZfPpjZGBQNRj
mJNtNFmzDZtzdzrLtwwRqJSchgfGcRfwRB
pWpjQjCTQnHMWCCpjQpHvTqcwTwScfRcBcSGBRThwS
MQHjvjVCCqsvljWnVQzLtNPZzmzLVNLddtPN
QVRPRVDgsRjLssnL
TTGDJDJfbfLHSnsMWWbs
qGqqTFFDqgQgQQQq
nlMnRRjbMjCdJVQJCZ
nGqfLwfNLFNLnPPGFVVCdVGZJtCtCCVzJz
LHHfPNHnPqqLwqPqDPWfNFvMglbhhbMgmclgcllDmgmrcl
cLLWWSThtdLpRcddcgPRZFDMCVPPMCCPCPCZ
NfGbGNzrBNffGNJjbPPZsZmZZPmDHpMH
zlJBfzlQzNjNjfJcpwSdvWhcvLwQWt
cVVQfVCJVrVcTJnfNvlDFmDrmlvrFWlL
snZHpMhZtMbtPNvzHWWvNFNvNW
gppnbbbRgMnZbswRqRwbqTcCCSTCJJdGjgfVGTdcCG
jplgNdrHrrNZgdHmlHNJHddlDSPPSTlzTSlTSDSzCQLfzf
vscvWWWvGWGGscbFMpRWFwQTPzfLQwQwPfLbzSzzDL
GvGBWpqcMVRNNZHgdHdtBJ
LchbZhjjZFjwSmPRqRffqbdtggdR
vWHMWlHJdGqtRqHV
MvzCJlnMnlTNnNNLLdhjjCdjjhDjjL
FNCllHFvCGvwQcPQJfgfmwgh
zjtRpbDLjtsrzbLLQmfBTgTBQQfhbfQB
WLgqRzqsrWvFGFZFZC
qjLlNcLjcNWpQLlQMmvmhCvCgsMZZghj
tGSDJtRGJzHMMGDVZCfvmfhzmZZgZsmv
BSSRDRHBGHtSSSbGJSwHbNcLQddqMNlrqcMQMldBWc
JSfctrtctDpszHvzVQHr
glCWjhWmFjlmlhmdWPhVVznvcHjszbvvpHvznv
FgBmFhCBCGFqglgmhCFmSTSRLJLLZfSRJcDSGMtM
vZGlFFtLMLdShSSShRVtVf
rQNvmznWPNCPNsrCsbWbsPCvjShhhfHBBHJjSJRhjSRnHhSj
mCNsQCmqszNcQzrzrrzWvGgGMgpdFpMLlFZGwcLDdg
QJRJQDlcqLlWbNGL
HCnwwsCrnstLWqtWNgZNgg
rsnTrTCHTnnVwnsVPqqDQcRjcczMPvPRzM
qCzjqnzVdzrdhnhddDbDBMPttcGBDBDPnc
sZgRQWHgWHHLsgsRRZsJbpJlDcDGNcTDFtGNFFcJNFPBPBTc
WggbRQSRRgRSsWWmbHqvVffVwhzvCdmfhmdV
lhqWcNpQGcNmmHmNPWCsQzQsgrQrBMCMbMVM
wDLFFDJvSFFZRDZSzCrzTzsRgVWbCrMW
dFwDtZfdjFZWFFfmHGPnPPmqfmPNcN
lcMRNJRGGLJnNVFbVrwrwZrD
tjCzQjQhQwgWFShVFS
ffHQsQssQTzBsPnLpMPRwsJP
MQSMSBSRFMQLJChLChjTBh
WmVlPrwnpwDlflNpDrNnDlDwThJCCdLJhhdhCfJTccGjvscd
gnDVnNnwgglwDwptSZFzgQHqbjZgZZ
nwBcFgwTDcNrpZMD
WQWCLZmvhMRvNjsNSD
CGGWmZGHHhtVzHbTqgTdbgzz
RmcTCwvssRbsThTcVRJJfSPqfJwJFqfjfMFq
zQNZDWtQlDZGBQPfFQqjJLjL
rrglggZGWnrnrrHlDhsbsPTVCsCVsTRpHv
wFGfzSvCPGttSzqwmtqmvvPRDDRCWgWWDTBTMcBcBWbCRM
hVJJHQHnpWnDTNnnDb
LJsVVdhQqvmdbbSf
srlJztzsVVsSsVtRlNllTWzzmqGhqWLPCDCgmChPLDdqCmCP
bZQMZpbvMBMgmDGmZLSPZd
MpScMSMpvfjMBcBcfMfSBnzlTjssNszrNrtlTVzlzFVN
rCtgrgClprGGClnJCZmwtMjZRjbjjcjZQv
PWVfBHWPdbNfbbRmRj
sPsVqFPsHWLhBVVqHFqPVddWSDLJgpTCnnrRRLGpJSSTRrgT
zjqpGjrQjGqSHCVvCrRZDN
cTdshMhdmcMNmddRHBhvCCBCCvHZDC
JTmTmJnLTdwzNQpPWJWgpP
BmpZmrzZnznHbpprSbQSQbqdSVqbPQcV
fRGTGJZRTTDwJTJRGDfgJgNFlSSFcldfdccFVlPlFFQPSQ
GvTTTZZLmsntzmCL
VhMcrmbhvzMSnhvftbRbllLtglBBtf
HqqqJqDqPjJPNjjDVFDZCdqBtRtGBGlGRfQQgttQfHlTQl
pCZJPqqZpmhvhpVh
dWLBJHJhGJGMBJRcDLDSQsSQpvcR
ZlnnPqglblfRRpSvSsnz
sPTgZVjjmwVTljrwTTlbwVGdJhBNNdFdMGNHHJMjBNFN
FhFrfbfgbLRdfqfrmvDgLdjrcQtSNStHHHQlSjJJPllt
CnspzZWTpCnMVzzZZGZRCzttHNjNlQlSNtNlNjVcjlQS
GCZsZBRwnvwfbqwFwb
bZnJFJgLFRnqQZqJQJFQGpCLNcGlLllClNtccjGc
rVfvwPDhPHGtlcbClr
mBhshsfMvBvqsQJdTbgnqQ
jgWHqMSWMGqWjWjqbWGJQDfVqLfrfDfJhVLfTr
pPplwsRZPFZFtLhfwgfwrhJL
zlRsdgFcRgmjdBCMHdjHWB
qJSGJSPQWzcprtQZtt
mBMVfsNBnZzcNtcc
LMLBsmMlvBgFsghVVvfgLBvbJJSqgGHqPGPtCWwbJHqCPG
ZvZLcdMGVMlHDvDpvqhH
NNSrQNbJbrTnnWZDDZqqhqpW
wbgNJrsrCwwJQZbsrJBFzjCCdzGdjcGzMdzj
JbVmdVLJJJdQMnzmmMgHjPqqjNgvqwngHNNP
ZfffDZZsRpcpRDcCRrlpplcWSSgwgSwjvvsjPSwhNSWggh
cCtfppZrpjtMMmdQQTLz
TtbnmbdmTmgTlPNhqvqj
wrwrLsVZRsJJJsfHjvPPWfhjHqRN
sDZwDvsCCQLJZQJQsMCMzZBtSMpndcSFnnSBFtSBmdBc
mWFTZdmQdZFrFQbCRsrspjSjnvCLRS
GwlDqcNHDzwGfHSRqCgJsSpnvpSL
NGlcNwHLLGfDDHDhDwDcwVczbPddZtMFWttWWtdPPdQdhPWd
mnfcZgcdZqnqdfFqPmHfhqsbgVMCJNMtvCJtMvtblTJtvb
rRLDDjPSjjPDGBQSBNbtLVtbMNNJlTMtbl
SzjDDzRRpGQDDDPHzdsmnnhsqcqdFq
ZDGNRDGjSdwnnmnsVNsHJJ
tMBWWrddLPLhvWTTPLccvmmbVpgsJHmccppJ
ClPrtBWWrhrFLBPlCRzjzGqdRzjRdRGZjF
csTRNQNJcNBDLfhfMf
qGmWpGHqrqPLChPRhVFPDD
tgHrtnrrJnZRTZcv
FLqrfmLDrqCmqjTqcbGqRTGVvb
FMtWMSWzzFStJzPzhWzhQvTvHVjjTjHTTHvbHc
PgtWWstWtSpZWPzWwnrBsdBDdFLfllLlfC
mThbMDMQDCDbwLqWpqPpdhwR
zgrcffgHNZltZSgHLsRsLLWRWgLqppsW
SVlSrfSHlSSVlrJfVctlNDMCmMFbnbRDbDBFJFbBRM
PrBrWqtRPdBLLrBwqpswgpwhgpnZhhzsgw
FTFRSVJQVJflFfQQgggGMZngGQZszZ
TbmfFJFSDFblSTDSFFbmVSDrPLLWtcmBqqRmBtmcLtcrjP
DjPsMwDjLVVTsvNNRTNTRT
ztdQQHqHlFNtfRNNNMgg
FzhMhHQlDcCrhCCc
zSHGzzmHgnnMDLTNTG
lPVBtvhQjpNSMWTLBD
VCftbjvbVCfPbZwsJsrSgSSZwC
CbwgmvMnmnCwMmwRQqJBGBgHZHpJHdtdZpJt
zVSlNSDlrzNhqlNTScDzVWfBBZZZZGBstGsdsWFpdHdJsW
NDlLzhrVcqRPCMRwLLLw
TjTHHLwnLjVlTwLjgVfvsFvDsdWfvDvFMd
qbRRRpmpcmDcczppztSqSvWFssFGfWdMvfQWdfsG
RZpqDBmtrzhzphjTgjHlnwjgJhgJ
dLmMgdgzwDLzDWFhBWvzFzzBZJ
tTVcppbSTfstTMMHfTbhBchhJFCWcjWBZhjGGB
SSSSNbsNRpRRsRrfVHfRpNtlPgQDLPdMmlDLlrPnqPdPLl
qqbTCSqdqqFZdRLZhwhZ
HWWlHtlrBfGtVssnsLnHfJVPPMMFzhPRwMPwFhzPZzPMGM
nfmtsrlsnrfVnHJrVBWlsVfgbbNTNSvmvvpcTjLjLbqvvS
GGhFvGPFcThqffPdnfNLqZZCSwtQSwZpwQQBsL
RglMRrJJgHBCBZSQQpdr
WmbRHHbzDgJMDzRDMdWmWHzHNFFvvGGhnvVvvfcvnFfcbvnT
QsfQmsLfZZZcshnJ
dSgdWgSVVFvzSpqFdqTgWRHbJNcbZNCTJCNNZRRCCh
FcpVjgDvVVFdVWFvzjwwQtBMLtBBGDwftPrB
rqsRrHsvsPqswNcJcNJrnnBrNn
bFjgGFdbVRNNnpRQpV
GSthhggGDSvMRqtHvMfM
ZwVPgMsgVsGzVsRZpgpzzgpFMrNbbLFrDLFFrrSDLfrNBN
qvnjBhQhntbfDLrF
CJlHHcHcTWqvpBdsWRpdPdgs
BjmTDjJBCBWrgQRPFlWWlW
dHphshtdtVHVhpJqspdvRrqFPgrLPPFPrrRPvQ
sdMsMtStVszpwMzHjJGjCcZjmScNfCDf
DmGdDffgDSDDdJstqdJldlRt
MhnvMCZCbbZHMvsCHtrcVrPjJcRqVtlt
LsQbsFZvZhQzZwhQWTNgBWpNwSGpTmfS
RRJQnCzbZZLTZJCBtWvFtsfqBqtfWb
prjlChGNldGNdlSVMhWfqWtfsvwvqsFtdtsq
GGjNDNhpMGMGVhrnZZTzcTHCCJcDHc
RmbMmjgpPjMBsBMfchhVsc
HwFWFTztSrtFpcQvBsSqVscBBC
zWwnJFHtWWHDgbGgdpGpnl
mnbWbRRLRFnmmWcCDTBVwCDBlwNW
ggJPtpdHGfdZtMHgtZgVPPBCVsPNBcsBTTDDCC
hpvJJTpGhdhtJdMHqvmmnLvSbmnFnRFm
WWtrWrNgVbRjMrQCNzqJFwQJFNTJ
LdHPhcdchQQssLzJrz
pBccnHpnrrcGHnnSlWjnRMSlbt
NMMfNFnZgMVThhTMcgTDJDJjsVvvJJqJmHsqHG
LQpwwprCQzBNBdGjGjHswswdvm
CBCzzCrbWbSlNQnTRgPPfFRWnfgc
RFwHVQRwFgTQSFVhdsdHsBdDBnnqnq
LGftLtPGGMzlNrhlPqPsrJ
fvGpWpMtccpTwwpRRQhh
TTJCGdTGtZRQQCnzcnCv
FWWHPSFNFbDbDDqSWnVmLRRjRRQLhcmLjS
qPwPWwFppbwggGZGfdJZgdnGdd
zSTWzrzWTLWpCtCGpqqGgplc
nZWwsJVZZBnJHJCclHllgtChgCgc
DFnVBJsFssVVFBFnBdfvjDSmTMWzrmMfRmTv
MJmgMssrsggqqMVstbwTcTbPbTTwThmw
NRBBGRjHVRRcRbCp
QnSfzLWzNHzNVQQVjrglJMsMFvgJdFWrgZ
ggLLGnhgnPvJHZnN
VBtmVSldbSBVlcNPHvjmNcwNZZ
tdWqSVSSBztVWGrThLhfrfvG
TDqrjdSwLqDppdTCdzPBFmmjQmhHFPFQhPFR
zlGbMcVcVtsPHFRhWRRsPF
btgvlVVcDZZZqgrz
DgwlgbbFDDjjPTHDrmddPhPV
WqtMBBtQsttMNWQBqsbJpGGzdPdTHLVmTzJhmTPhHHPTmH
qQsqGZNQtZGMNsNtZpFnjnCRbZffwwSRljFf
gMdFLCdnMZCTFFCqnTgWLCHfSgPgPHStcQQmfSBBSfHg
vrwwrwzbGjjswjvhGGsjPQmqRmHPbBtcBQtqfmcH
qzJllVsGVGljjsrzwDzhwzDGTddNLFnZWNdpCVWTNTZTLZCF
LtwMhDtctwbwwppdWBJQJBWPvPfDfqvG
FTzrNrgSRFrgzFRHNVFQJvlqHjBvQWlQWqPBfq
sFgNzmVmNzgTvVTMwhMhstMwZtsbsc
MrBDQVzzlrvhQzQrDMVQrzrzgRJnRRwwRbwSwwVRRNSgwwwJ
qFTPTvfTHcqqncpcwR
LmtdGGPmTPGCTLHLWsZMhvZMMMzrzzdlMQ
ZVNpjfpZNpfNgNjzNVfWtnbbWmBHtsZWBSZBGS
MrDrQvvDrPLDMvFvdmBGGsBBCtsHrnrGCm
ltRMwLLDDRlvQwvlQcwhqfcJNpgzjJpjhJ
sRRRlRbcFbBBdnFBwCGppNvGrTCDDGVNlr
PPSLQzHjzZZPLZPjgTNTgpCbVJvGrNCTGr
ZLHHPQjhQmWWSRRnssdtbnmfwF
GRwrMrHJGwJPGWsgfqQgsc
VbTvLQCZLSWWsgWf
TVDvVCvppvTDmzZVTbZpTzBBNQQQJlJBBJBNNJmRBwRH
shJRWJsjZGNjSTrjFS
dMLCddggldQzMCCVgzVVLmLvTwNFFSqpNSqSbFGSqTTpMTFN
VGQvVglCLcVzgdddCDVvlsPZRRBDJPHZWZZnBsWJRR
CrwlwhRCMrswnsHBFccHHWFc
QJTmtfQgLtzQfLQfdPcWSFHHDDSpcFpFBg
jTQTqbfQfmLbLQJbJrRCWjljZGjNrZlZlC
JmthDmLShtJmHphphJQCwjdjdFDzFgzFdgdNlC
sbMTVBrWMbNvVMnsWMnVzjsjwCfjFgfZzfdgdzlj
NvqbbBcMMPPSqLSpGGthmp
RfGWFHlPFFNWGFZRZBjvwCvzBwhhrvvjzmrr
sLJSLMSTSJTbStJtMSqSqbpMrvmrzWdvhmjDCzzwrrpjdDDv
SbQqsqsWcZPcQGFG
BjqbMqMVBsfqGqFqGLmF
ZZQbQPddPcwbPnRQltdtQZdnmFNrvfhGrhrWWFNWWtmNFNNW
dJJQccnRPpcbQcMHsSgSMsDMTJSg
WWGBBvPflnWbBWhvhbPvNfnnVCFZmVRVZmVGMVwRLCCCGwVC
gjszgTMrgzgqCRRdmJRjJLVw
grzQHzqczMSzqSHcgQsqPvPlbNblpPhhPPbHvnhp
sJDDNWdnRLTTvqwSFPCmLCCrCq
thzplgfjglflFcbMclpppMfcwPqCZQCmqCwrzCqmQmHSqPqq
MhcpFBMBlhjbBTdnNJWvNvsvBd
czwwghnWWfcfgwfWthfrvVvrjdrdvDDVrbzrLF
RHPPMRpQPRMPPJRjJQsZsrrvvJBDDVDVdFqrBrFdBv
smjMsGZHRsHSmRQNGHPpSTwwttCflwngnChcCtWW
bprrrwrtLDtrWwrQjRDQDbPPVHVmmmmHNWlPlVNPZZlv
hqqhfnBCTfnnhzJwzsqzfPZZMCCVZVHHFvZMFvZmlC
TzhhdJTqJzcBdJJnzjtQrLdjwgLtpbgrLQ
qzQvzzgWSCqtqqGpddGc
jLrZNZhZrNRLHNffhrjNjNdtdZtGcPFwFwpbGwbVpdwC
nHnhrLNCCMHmhHBMhrzvgJvsWSWMWzzWzSlv
RzcbzdRFzbbzbzbFdZFTHMZPhVhVQMLrlrQPhLZlMM
BNGfBvsNttVmMhlMLm
BwGjpllswfjwpcFDWcWcbpdb
SjzpswrLSDjVSpwlmZJBTBdNJLvBNvHQZT
rCcCtbqgCfthggtbGGMqqghqZQvvQTBNJQHQZQTcZTJFZFFd
CggGMtqMfWbbGghPhhbCMtmsSppSspjpmWzjVSWlVrrm
PmWTPThTQWnLWQFl
VNcSVfMbtsddBQNnNpdl
sSjctwjVSzzccjgnTnDTHRDhqjRR
WfMWfCNCjWWHNTccMjRjfRcMbqSwfVwqwsfGGbssrJSrswVw
llLFQLlvlPFnhQBPBZQBqvBwzSzGGhShJVwShmsJbbmzSG
lnPqvQZBFFBnnpgplFvtvHDjTdcTjTMMjCRNCMWgRC
rprFNFFNjNLmMdgcqL
BvzCQQbBQgffsDbvVHMdbcVqmLVqlmqq
JvJCzBDJwnsRnQDszCBnnnQBrjZPjFpgZFTFZRpTrpZFGFtT
wBHQQZHVCcpwDgdZdMsZjvMZFn
GPSzlNlJLfzzzvsWdWLMmFWLMM
NfqGSfrTNzRTqJfRbptQHFQFrwrFHBHw
sNjVMVNVMzPzQgghcMsNzJtjSJtTFDTJtJnnDLjDnL
CHwrdCpvCrwrWdpZqcpFttJSFJTLLHLJfbnbfD
qrlZCwlqZrqqpWdlRqCRqdqcVNsVMzQzmNgNPBsRhVQVVzMs
`;