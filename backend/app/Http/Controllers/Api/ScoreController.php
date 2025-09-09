<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Score;
use App\Services\Subjects\GroupASubjectManager; // Sử dụng concrete class đã tạo
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScoreController extends Controller
{
    private $subjectManager;

    // Constructor để inject OOP class
    public function __construct(GroupASubjectManager $subjectManager)
    {
        $this->subjectManager = $subjectManager;
    }


    public function checkScore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sbd' => 'required|string|exists:scores,sbd',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $score = Score::where('sbd', $request->input('sbd'))->firstOrFail(); 
        return response()->json($score);
    }   


    public function report()
    {
        $subjects = $this->subjectManager->getSubjects(); 
        $stats = [];

        foreach ($subjects as $subject) {
            $stats[$subject] = $this->subjectManager->getStatsForSubject($subject);
        }

        return response()->json([
            'stats' => $stats,
            'labels' => ['>=8', '6-8', '4-6', '<4'], // Dùng cho chart
        ]);
    }

    /**
     * List top 10 students of group A (math, physics, chemistry)
     */
    public function top10GroupA()
    {
        $groupSubjects = $this->subjectManager->getGroupSubjects('A'); // Lấy subjects từ OOP

        if (empty($groupSubjects)) {
            return response()->json(['error' => 'Group A not supported'], 400);
        }

        $totalExpr = implode(' + ', $groupSubjects); // Tạo biểu thức tổng: toan + vat_li + hoa_hoc

        $top = Score::select('sbd', ...$groupSubjects)
            ->selectRaw("($totalExpr) as total")
            ->whereNotNull($groupSubjects[0]) // toan
            ->whereNotNull($groupSubjects[1]) // vat_li
            ->whereNotNull($groupSubjects[2]) // hoa_hoc
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return response()->json($top);
    }
}